import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  { value: "8 lat", label: "doświadczenia w psychologii" },
  { value: "1 500+", label: "przeprowadzonych sesji" },
  { value: "4.9 / 5", label: "średnia ocena klientów" },
];

export default function SocialProofBar() {
  return (
    <section
      className="py-7"
      style={{
        background: "rgba(31,49,77,0.04)",
        borderTop: "1px solid rgba(45,41,38,0.06)",
        borderBottom: "1px solid rgba(45,41,38,0.06)",
      }}
    >
      <div className="container-main">
        <div className="flex flex-wrap justify-center sm:justify-around gap-8 sm:gap-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.value} delay={i * 0.08} className="text-center">
              <p
                className="font-display font-semibold text-[#1F314D] mb-0.5"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </p>
              <p className="text-[#9A8E85] text-sm">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
