"use client"

import { useTranslations } from "next-intl"

export function Warning() {
  const t = useTranslations("nano.warning")

  const sites = ["nanobanana.ai", "nanobananaimg.com", "nanobanana.gg"]

  return (
    <section className="py-24 bg-gradient-to-b from-banana-500/5 to-orange-500/5 border-y border-banana-500/20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="text-5xl mb-5">⚠️</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {t("title")}
        </h2>

        <div className="bg-card border border-banana-500/20 rounded-2xl p-8 text-left">
          <h4 className="text-banana-500 font-bold text-lg mb-4 flex items-center gap-2">
            <span>⚠️</span> {t("box.title")}
          </h4>

          <p className="text-muted-foreground mb-4">{t("box.description")}</p>

          <ul className="space-y-2 text-muted-foreground mb-6">
            {sites.map((site) => (
              <li key={site} className="pl-6">{site}</li>
            ))}
          </ul>

          <p className="text-muted-foreground mb-6">{t("box.warning")}</p>

          <div className="bg-banana-500/10 border-l-3 border-banana-500 rounded-r-lg p-4 text-sm text-muted-foreground">
            {t("box.note")}
          </div>
        </div>
      </div>
    </section>
  )
}
