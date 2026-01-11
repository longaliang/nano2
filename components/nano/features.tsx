"use client"

import { useTranslations } from "next-intl"

export function Features() {
  const t = useTranslations("nano.features")

  const features = [
    {
      icon: "✏️",
      key: "generation"
    },
    {
      icon: "🖼️",
      key: "editing"
    },
    {
      icon: "🔄",
      key: "fusion"
    },
    {
      icon: "👤",
      key: "consistency"
    }
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="bg-card border border-banana-500/10 rounded-2xl p-8 md:p-10 transition-all hover:translate-y-[-8px] hover:border-banana-500/30 hover:shadow-lg hover:shadow-banana-500/10 relative overflow-hidden group"
            >
              {/* Top border glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-banana-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-banana-500 mb-4">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t(`${feature.key}.description`)}
              </p>

              {feature.key === "editing" && (
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("editing.list.background")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("editing.list.clothing")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("editing.list.add")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("editing.list.remove")}
                  </li>
                </ul>
              )}

              {feature.key === "consistency" && (
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("consistency.list.ip")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("consistency.list.avatar")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-banana-500">›</span>
                    {t("consistency.list.character")}
                  </li>
                </ul>
              )}

              {(feature.key === "generation" || feature.key === "fusion") && (
                <div className="bg-card/50 border border-banana-500/20 rounded-lg p-4 font-mono text-sm text-banana-500">
                  {t(`${feature.key}.example`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
