import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { deductPoints } from "@/lib/points"

// 每次生成图片消耗的积分
const POINTS_PER_GENERATION = 60

// Replicate API 配置
const REPLICATE_API_URL = "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions"

// 轮询获取结果的辅助函数
async function pollForResult(predictionId: string, apiKey: string): Promise<string> {
  const maxAttempts = 30
  let attempts = 0

  while (attempts < maxAttempts) {
    attempts++

    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    const data = await response.json()

    if (data.status === 'succeeded' && data.output) {
      return data.output[0]
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      throw new Error('生成失败')
    }

    // 等待后重试
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  throw new Error('生成超时')
}

export async function POST(request: NextRequest) {
  try {
    // 检查用户登录状态
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // 解析请求体
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "请提供有效的描述文字" },
        { status: 400 }
      )
    }

    // 检查 API Key
    const apiKey = process.env.REPLICATE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "服务器配置错误：未设置 REPLICATE_API_KEY" },
        { status: 500 }
      )
    }

    // 扣除积分
    try {
      const remainingPoints = await deductPoints(
        userId,
        POINTS_PER_GENERATION,
        `AI 图片生成 - 消耗 ${POINTS_PER_GENERATION} 积分`
      )

      // 调用 Replicate API 生成图片
      const response = await fetch(REPLICATE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify({
          input: {
            prompt: prompt,
            go_fast: true,
            num_outputs: 1,
            aspect_ratio: '1:1',
            output_format: 'webp',
            output_quality: 80
          }
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message || data.error)
      }

      let imageUrl: string

      // 如果有输出，直接返回
      if (data.output && data.output.length > 0) {
        imageUrl = data.output[0]
      }
      // 如果还在处理中，轮询获取结果
      else if (data.status === 'processing' || data.status === 'starting') {
        imageUrl = await pollForResult(data.id, apiKey)
      } else {
        throw new Error('生成失败')
      }

      return NextResponse.json({
        success: true,
        imageUrl,
        pointsUsed: POINTS_PER_GENERATION,
        remainingPoints,
        message: `图片生成成功！消耗 ${POINTS_PER_GENERATION} 积分`
      })

    } catch (error: any) {
      if (error.message === "积分不足") {
        return NextResponse.json(
          {
            error: "积分不足",
            message: `生成图片需要 ${POINTS_PER_GENERATION} 积分，您的积分不足。请先充值积分。`
          },
          { status: 400 }
        )
      }
      throw error
    }

  } catch (error: any) {
    console.error("图片生成失败:", error)
    return NextResponse.json(
      { error: error.message || "图片生成失败，请稍后重试" },
      { status: 500 }
    )
  }
}
