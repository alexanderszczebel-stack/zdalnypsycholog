"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phone: z.string().optional(),
  topic: z.string().min(1, "Wybierz temat"),
  message: z.string().min(20, "Wiadomość musi mieć co najmniej 20 znaków"),
  rodo: z.literal(true, { message: "Wymagana zgoda RODO" }),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-2xl p-8 text-center">
        <CheckCircle2 size={48} className="text-[color:var(--color-primary)] mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-2">
          Dziękujemy!
        </h3>
        <p className="text-[color:var(--color-text-secondary)]">
          Odpiszemy w ciągu 24 godzin w dni robocze.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
          Imię i Nazwisko *
        </label>
        <input {...register("name")} className="input-field" placeholder="Jan Kowalski" />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
          E-mail *
        </label>
        <input
          {...register("email")}
          type="email"
          className="input-field"
          placeholder="jan@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
          Telefon (opcjonalnie)
        </label>
        <input
          {...register("phone")}
          type="tel"
          className="input-field"
          placeholder="+48 123 456 789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
          Temat *
        </label>
        <select {...register("topic")} className="input-field">
          <option value="">Wybierz temat</option>
          <option value="pytanie">Pytanie o terapię</option>
          <option value="rezerwacja">Rezerwacja wizyty</option>
          <option value="techniczne">Problem techniczny</option>
          <option value="inne">Inne</option>
        </select>
        {errors.topic && (
          <p className="text-red-500 text-xs mt-1">{errors.topic.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
          Wiadomość *
        </label>
        <textarea
          {...register("message")}
          className="input-field resize-none"
          rows={5}
          placeholder="W czym mogę Ci pomóc?"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex gap-3 cursor-pointer">
          <input
            {...register("rodo")}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[color:var(--color-primary)]"
          />
          <span className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
            Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności
            w celu odpowiedzi na moją wiadomość. *
          </span>
        </label>
        {errors.rodo && (
          <p className="text-red-500 text-xs mt-1">{errors.rodo.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
