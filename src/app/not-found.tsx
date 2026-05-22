import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-32 bg-[color:var(--color-bg-main)] text-center">
      <div className="container-main max-w-xl">
        <p className="font-display font-bold text-8xl text-[color:var(--color-primary)]/20 mb-4">404</p>
        <h1 className="font-display font-bold text-3xl text-[color:var(--color-text-primary)] mb-4">
          Strona nie została znaleziona
        </h1>
        <p className="text-[color:var(--color-text-secondary)] text-lg mb-8">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Strona główna
          </Link>
          <Link href="/kontakt" className="btn-secondary">
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}
