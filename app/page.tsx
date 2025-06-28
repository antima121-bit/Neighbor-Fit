import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero"
import { ProblemAnalysisSection } from "@/components/sections/problem-analysis"
import { DataShowcaseSection } from "@/components/sections/data-showcase"
import { QuickStartSection } from "@/components/sections/quick-start"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemAnalysisSection />
      <DataShowcaseSection />
      <QuickStartSection />
    </main>
  )
}
