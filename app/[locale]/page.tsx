"use client"

import { useEffect } from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageBackground } from "@/components/page-background"

// Nano Banana Components
import { Hero } from "@/components/nano/hero"
import { Generator } from "@/components/nano/generator"
import { Intro } from "@/components/nano/intro"
import { Features } from "@/components/nano/features"
import { Why } from "@/components/nano/why"
import { Steps } from "@/components/nano/steps"
import { Scenarios } from "@/components/nano/scenarios"
import { Warning } from "@/components/nano/warning"
import { FAQ } from "@/components/nano/faq"

export default function LocalePage() {
  useEffect(() => {
    // 处理URL中的锚点
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // 延迟滚动，确保页面完全加载
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])

  return (
    <PageBackground>
      <Navbar />
      <main>
        <Hero />
        <Generator />
        <Intro />
        <Features />
        <Why />
        <Steps />
        <Scenarios />
        <Warning />
        <FAQ />
      </main>
      <Footer />
    </PageBackground>
  )
}
