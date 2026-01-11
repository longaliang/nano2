"use client"

import { useTranslations } from "next-intl"

export function Intro() {
  const t = useTranslations("nano.intro")

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          {t("title.before")} <span className="text-banana-500">{t("title.highlight")}</span>?
        </h2>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            <span className="text-banana-500 font-semibold">{t("product.name")}</span> {t("product.description")}
          </p>

          <p className="text-lg text-muted-foreground">
            {t("product.origin")}
          </p>

          <p className="text-2xl text-banana-500 font-semibold pt-8">
            {t("product.summary")}
          </p>

          <p className="text-lg text-muted-foreground pt-4">
            {t("product.note")}
          </p>
        </div>
      </div>
    </section>
  )
}
