"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("access_key", "c05b8b38-3ec4-46e7-8e25-10e7b43d3c6b");
    formData.append("subject", "Nowa wiadomość z zdalnypsycholog.pl");
    formData.append("from_name", "zdalnypsycholog.pl");
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("topic", data.topic);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.success) {
        setIsSuccess(true);
        setIsError(false);
        trackEvent("formularz_wyslany", {
          event_category: "kontakt",
          event_label: "formularz_kontakt",
        });
        reset();
        setSubmitted(true);
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    } catch {
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-2xl p-8 text-center">
        <CheckCircle2 size={48} className="text-[color:var(--color-primary)] mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-2">
          Dziękujemy!
        </h3>
        <p className="text-[color:var(--color-text-secondary)]">
          Wiadomość została przekazana. Odpowiedź zostanie wysłana w dni robocze.
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
          <option value="pytanie">Pytanie o konsultację</option>
          <option value="rezerwacja">Ustalenie terminu</option>
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
          placeholder="Krótko opisz temat konsultacji lub preferowany sposób kontaktu."
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
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
      {isSuccess && (
        <p className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl mt-3">
          Wiadomość wysłana. Odpowiedź otrzymasz w dni robocze.
        </p>
      )}
      {isError && (
        <p className="text-sm text-red-700 bg-red-50 px-4 py-3 rounded-xl mt-3">
          Coś poszło nie tak. Spróbuj ponownie albo skontaktuj się telefonicznie.
        </p>
      )}
    </form>
  );
}
