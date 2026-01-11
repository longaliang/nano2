"use client"

import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations("nano.hero")

  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 py-32 relative">
      {/* Background animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-banana-500/5 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        <div className="inline-block bg-banana-500/10 text-banana-500 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-banana-500/30">
          {t("badge")}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          {t("title.before")}
          <span className="text-banana-500">{t("title.highlight")}</span>
          {t("title.after")}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-light">
          {t("subtitle")}
        </p>

        {/* Quote */}
        <div className="bg-card border-l-4 border-banana-500 p-6 md:p-8 rounded-r-2xl mb-10 text-left max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground italic">
            "{t("quote")}"
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="#features"
          className="inline-block bg-gradient-to-r from-banana-500 to-orange-500 text-background px-8 py-4 rounded-full font-bold text-lg hover:translate-y-[-2px] transition-transform shadow-lg hover:shadow-banana-500/30"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  )
}
