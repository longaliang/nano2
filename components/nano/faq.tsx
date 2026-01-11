"use client"

import { useTranslations } from "next-intl"

export function FAQ() {
  const t = useTranslations("nano.faq")

  const faqs = [
    { key: "free" },
    { key: "commercial" },
    { key: "instruction" },
    { key: "quality" }
  ]

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.key}
              className="bg-card border border-banana-500/10 rounded-xl overflow-hidden transition-all hover:border-banana-500/30"
            >
              <div className="p-6 md:p-8 font-bold text-banana-500 flex items-center gap-3">
                <span className="w-8 h-8 bg-banana-500/10 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  Q
                </span>
                {t(`${faq.key}.question`)}
              </div>
              <div className="px-6 md:px-8 pb-6 md:pb-8 text-muted-foreground pl-16 md:pl-20">
                {t(`${faq.key}.answer`)}

                {faq.key === "instruction" && (
                  <div className="flex gap-5 mt-4 text-sm">
                    <div className="flex-1 p-4 rounded-lg bg-destructive/10 text-destructive">
                      ❌ {t("instruction.bad")}
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-green-500/10 text-green-500">
                      ✅ {t("instruction.good")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
