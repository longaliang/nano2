import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { deductPoints } from "@/lib/points"

// 每次生成图片消耗的积分
const POINTS_PER_GENERATION = 60

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

    // 扣除积分
    try {
      const remainingPoints = await deductPoints(
        userId,
        POINTS_PER_GENERATION,
        `AI 图片生成 - 消耗 ${POINTS_PER_GENERATION} 积分`
      )

      // TODO: 这里调用实际的 AI 图片生成 API
      // 目前返回模拟数据
      // const imageUrl = await generateImage(prompt)

      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 模拟生成的图片 URL（实际应该从 AI API 获取）
      const mockImageUrl = `https://via.placeholder.com/512x512/FFD700/000000?text=${encodeURIComponent(prompt.slice(0, 20))}`

      return NextResponse.json({
        success: true,
        imageUrl: mockImageUrl,
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

  } catch (error) {
    console.error("图片生成失败:", error)
    return NextResponse.json(
      { error: "图片生成失败，请稍后重试" },
      { status: 500 }
    )
  }
}
