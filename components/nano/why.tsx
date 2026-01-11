"use client"

import { useTranslations } from "next-intl"

export function Why() {
  const t = useTranslations("nano.why")

  const reasons = [
    { key: "natural" },
    { key: "consistency" },
    { key: "blending" },
    { key: "speed" },
    { key: "styles" },
    { key: "fusion" }
  ]

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span> {t("title.after")}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.key}
              className="bg-card rounded-2xl p-8 flex gap-5 items-start transition-all hover:bg-banana-500/5"
            >
              <span className="text-5xl font-black text-banana-500/50 leading-none">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  {t(`${reason.key}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t(`${reason.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
