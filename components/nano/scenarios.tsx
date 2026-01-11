"use client"

import { useTranslations } from "next-intl"

export function Scenarios() {
  const t = useTranslations("nano.scenarios")

  const scenarios = [
    {
      icon: "📱",
      key: "social"
    },
    {
      icon: "📖",
      key: "creative"
    },
    {
      icon: "🛒",
      key: "business"
    }
  ]

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.key}
              className="bg-card rounded-2xl p-10 text-center border border-banana-500/10 transition-all hover:border-banana-500 hover:scale-[1.02]"
            >
              <div className="text-6xl mb-5">{scenario.icon}</div>
              <h4 className="text-xl font-bold text-banana-500 mb-6">
                {t(`${scenario.key}.title`)}
              </h4>
              <ul className="text-left space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-banana-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {t(`${scenario.key}.list.0`)}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-banana-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {t(`${scenario.key}.list.1`)}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-banana-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {t(`${scenario.key}.list.2`)}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
