'use client'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { CONTACT_EMAIL } from '@/lib/contact'

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    const formData = new FormData(e.currentTarget)
    formData.append('access_key', 'c05b8b38-3ec4-46e7-8e25-10e7b43d3c6b')
    formData.append('subject', 'Nowa wiadomość z formularza zdalnypsycholog.pl')
    formData.append('from_name', 'zdalnypsycholog.pl')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setIsSuccess(true)
        trackEvent('formularz_wyslany', {
          event_category: 'kontakt',
          event_label: 'formularz_glowny'
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input type="text" name="name" placeholder="Imię" required
          className="flex-1 px-5 py-4 rounded-2xl text-base outline-none"
          style={{background:'#F6EFE6', border:'1px solid rgba(45,41,38,0.1)', color:'#2D2926'}} />
        <input type="email" name="email" placeholder="Adres email" required
          className="flex-1 px-5 py-4 rounded-2xl text-base outline-none"
          style={{background:'#F6EFE6', border:'1px solid rgba(45,41,38,0.1)', color:'#2D2926'}} />
      </div>
      <textarea name="message" placeholder="Krótko opisz temat konsultacji lub preferowany sposób kontaktu. (opcjonalnie)"
        rows={4} className="px-5 py-4 rounded-2xl text-base outline-none resize-none"
        style={{background:'#F6EFE6', border:'1px solid rgba(45,41,38,0.1)', color:'#2D2926'}} />
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="rodo"
          required
          id="rodo-consent"
          className="mt-1 flex-shrink-0"
        />
        <label htmlFor="rodo-consent"
               className="text-xs leading-relaxed"
               style={{color:'#6F6860'}}>
          Administratorem Twoich danych jest Mikołaj Szczebel
          ({CONTACT_EMAIL}). Dane przetwarzane są w celu
          odpowiedzi na zapytanie na podstawie Twojej zgody (Art. 6 ust. 1
          lit. a RODO). Szczegóły w{' '}
          <a href="/polityka-prywatnosci"
             className="underline"
             style={{color:'#BC6C25'}}>
            Polityce Prywatności
          </a>.
        </label>
      </div>
      <button type="submit" disabled={isLoading}
        className="w-full py-4 rounded-full text-white font-semibold text-base"
        style={{background:'#BC6C25', opacity: isLoading ? 0.7 : 1}}>
        {isLoading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
      {isSuccess && (
        <p className="text-sm text-center py-3 px-4 rounded-xl"
           style={{background:'#F0FAF0', color:'#2D6A2D'}}>
          Wiadomość wysłana. Odpowiedź otrzymasz w dni robocze.
        </p>
      )}
      {isError && (
        <p className="text-sm text-center py-3 px-4 rounded-xl"
           style={{background:'#FFF0F0', color:'#8B2020'}}>
          Coś poszło nie tak. Skontaktuj się telefonicznie albo napisz na {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  )
}
