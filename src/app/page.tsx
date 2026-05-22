import HeroSection from "@/components/home/HeroSection";
import ProblemCards from "@/components/home/ProblemCards";
import SpecialistsSection from "@/components/home/SpecialistsSection";
import QuizPreview from "@/components/home/QuizPreview";
import ProcessSection from "@/components/home/ProcessSection";
import WhyOnlineSection from "@/components/home/WhyOnlineSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemCards />
      <SpecialistsSection />
      <QuizPreview />
      <ProcessSection />
      <WhyOnlineSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
