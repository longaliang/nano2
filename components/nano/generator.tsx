"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"

export function Generator() {
  const t = useTranslations("nano.generator")
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(t("error.empty"))
      return
    }

    // 检查是否登录
    if (!session) {
      setError("请先登录后再生成图片")
      return
    }

    setLoading(true)
    setError("")
    setImageUrl("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/image/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "生成失败")
      }

      setImageUrl(data.imageUrl)
      setSuccessMessage(data.message || `图片生成成功！消耗 ${data.pointsUsed} 积分`)
    } catch (err: any) {
      setError(err.message || t("error.failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="generator" className="py-24 bg-card/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          AI <span className="text-banana-500">{t("title")}</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-4">
          {t("subtitle")}
        </p>
        <p className="text-center text-banana-500 font-semibold mb-12">
          每次生成消耗 60 积分
        </p>

        <div className="bg-card rounded-3xl p-8 md:p-10 border border-banana-500/20">
          <div className="mb-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("placeholder")}
              rows={4}
              className="w-full bg-card border border-banana-500/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:border-banana-500 focus:outline-none resize-none transition-colors"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-banana-500 to-orange-500 text-background py-4 rounded-xl font-bold text-lg hover:translate-y-[-2px] transition-transform disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-banana-500/30"
            >
              {loading ? t("generating") : `${t("button")} (60积分)`}
            </button>
          </div>

          <div className="relative min-h-[400px] bg-card rounded-xl flex items-center justify-center overflow-hidden border border-border">
            {loading ? (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-banana-500/20 border-t-banana-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">{t("loading")}</p>
              </div>
            ) : imageUrl ? (
              <div className="text-center">
                <img src={imageUrl} alt={t("alt")} className="w-full max-w-md mx-auto rounded-xl" />
                {successMessage && (
                  <p className="text-green-500 mt-4">{successMessage}</p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <span className="text-6xl block mb-4">🎨</span>
                <p className="text-muted-foreground">{t("placeholder_text")}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-center">
              {error}
            </div>
          )}

          {session && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              已登录为: {session.user?.name || session.user?.email}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
