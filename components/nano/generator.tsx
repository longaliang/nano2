"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

export function Generator() {
  const t = useTranslations("nano.generator")
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(t("error.empty"))
      return
    }

    setLoading(true)
    setError("")
    setImageUrl("")

    try {
      // TODO: 实现实际的图片生成 API 调用
      // 这里暂时使用模拟数据
      await new Promise(resolve => setTimeout(resolve, 2000))
      // setImageUrl(response.data.imageUrl)
    } catch (err) {
      setError(t("error.failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          AI <span className="text-banana-500">{t("title")}</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12">
          {t("subtitle")}
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
              {loading ? t("generating") : t("button")}
            </button>
          </div>

          <div className="relative min-h-[400px] bg-card rounded-xl flex items-center justify-center overflow-hidden border border-border">
            {loading ? (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-banana-500/20 border-t-banana-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">{t("loading")}</p>
              </div>
            ) : imageUrl ? (
              <img src={imageUrl} alt={t("alt")} className="w-full h-full object-contain" />
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
        </div>
      </div>
    </section>
  )
}
