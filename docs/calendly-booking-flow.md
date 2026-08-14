# Calendly booking flow

## Cel

Docelowy proces reklamowy:

1. Reklama albo CTA prowadzi na `/rezerwacja`.
2. Użytkownik wybiera termin w Calendly.
3. Użytkownik podaje wymagane dane w Calendly.
4. Płatność Stripe odbywa się podczas rezerwacji w Calendly.
5. Termin jest potwierdzony dopiero po skutecznej płatności.

Calendly pozostaje źródłem prawdy dla terminów, rezerwacji, danych klienta, ceny i płatności.

## Zmienne środowiskowe

Wklej właściwy adres Calendly w jednej z poniższych zmiennych:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://...
NEXT_PUBLIC_CALENDLY_EMBED_URL=https://...
```

`NEXT_PUBLIC_CALENDLY_EMBED_URL` jest opcjonalne. Jeśli nie jest ustawione, komponent osadza
`NEXT_PUBLIC_CALENDLY_URL`.

Nie wpisuj linku Calendly na stałe w wielu komponentach.

## Ważne przed produkcją

Po połączeniu Calendly ze Stripe:

1. W ustawieniach eventu Calendly ustaw obowiązkową płatność 250 zł przed potwierdzeniem terminu.
2. Sprawdź, czy publiczny link eventu to wartość używana w `NEXT_PUBLIC_CALENDLY_URL`.
3. Ustaw przekierowanie po udanej rezerwacji/płatności na `/dziekujemy-za-rezerwacje/`, jeśli Calendly pozwala to zrobić w danym planie i typie eventu.
4. Przetestuj rezerwację testową w Calendly/Stripe przed kampanią.

## Analityka

Kod wysyła neutralne zdarzenia CTA, np.:

- `booking_cta_click`
- `rozpoczecie_rezerwacji`

Nie wysyłaj do GA4, Meta ani GTM diagnoz, objawów, powodów zgłoszenia, treści formularzy
ani innych danych dotyczących zdrowia.

Na tym etapie nie wysyłamy zdarzenia `Purchase` ani `Lead` z poziomu strony. Takie zdarzenie
można dodać dopiero po potwierdzeniu, który callback Calendly jednoznacznie oznacza skuteczną
płatność.

## UTM

CTA i embed Calendly zachowują wyłącznie neutralne parametry:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
