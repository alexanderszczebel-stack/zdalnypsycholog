'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent')
      if (!consent) setVisible(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6"
         style={{background:'#1F314D'}}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row
                      items-start md:items-center gap-4">
        <p className="text-sm flex-1 leading-relaxed"
           style={{color:'rgba(255,255,255,0.85)'}}>
          Używamy plików cookies, aby zapewnić prawidłowe funkcjonowanie
          strony i analizować ruch. Szczegóły znajdziesz w{' '}
          <a href="/polityka-cookies"
             className="underline"
             style={{color:'#E8D8C4'}}>
            Polityce Cookies
          </a>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={reject}
            className="px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background:'transparent',
              border:'1px solid rgba(255,255,255,0.3)',
              color:'rgba(255,255,255,0.8)'
            }}>
            Odrzuć
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-full text-sm font-medium"
            style={{background:'#BC6C25', color:'#fff'}}>
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  )
}
