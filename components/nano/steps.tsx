"use client"

import { useTranslations } from "next-intl"

export function Steps() {
  const t = useTranslations("nano.steps")

  const steps = [
    { key: "open" },
    { key: "upload" },
    { key: "edit" }
  ]

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={step.key} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-banana-500 to-orange-500 rounded-full flex items-center justify-center text-3xl font-black text-background mx-auto mb-6 shadow-lg shadow-banana-500/30">
                {index + 1}
              </div>
              <h4 className="text-xl font-bold mb-4">
                {t(`${step.key}.title`)}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                {t(`${step.key}.description`)}
              </p>
              {step.key === "open" && (
                <div className="bg-card/50 border border-banana-500/20 rounded-lg p-4 font-mono text-xs text-banana-500 text-left">
                  {t("open.note")}
                </div>
              )}
              {step.key === "edit" && (
                <div className="bg-card/50 border border-banana-500/20 rounded-lg p-4 font-mono text-xs text-banana-500 text-left">
                  {t("edit.example")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
