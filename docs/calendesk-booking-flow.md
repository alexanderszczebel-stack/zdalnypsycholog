# Calendesk booking flow

## Cel

Docelowy proces reklamowy:

1. Reklama prowadzi na `/polacy-za-granica/`.
2. CTA prowadzi do `/polacy-za-granica/#rezerwacja`.
3. Użytkownik wybiera termin w Calendesk.
4. Płatność jest obowiązkowa podczas rezerwacji.
5. Termin jest potwierdzony dopiero po skutecznej płatności.

## Zmienne środowiskowe

Wklej właściwy adres Calendesk w jednej z poniższych zmiennych:

```bash
NEXT_PUBLIC_CALENDESK_BOOKING_URL=https://...
NEXT_PUBLIC_CALENDESK_EMBED_URL=https://...
NEXT_PUBLIC_BOOKING_ENABLED=false
```

`NEXT_PUBLIC_CALENDESK_EMBED_URL` pokazuje osadzony panel. Jeżeli nie jest ustawiony,
komponent używa `NEXT_PUBLIC_CALENDESK_BOOKING_URL` jako linku otwieranego w nowej karcie.

Nie wpisuj linku Calendesk na stałe w kodzie.

## Ważne przed produkcją

Nie włączać rezerwacji na produkcji, dopóki Calendesk nie wymaga obowiązkowej płatności
przed potwierdzeniem terminu.

Po połączeniu Calendesk ze Stripe:

1. Ustaw obowiązkową płatność 250 zł przed potwierdzeniem terminu.
2. Wklej adres Calendesk do `NEXT_PUBLIC_CALENDESK_BOOKING_URL` lub `NEXT_PUBLIC_CALENDESK_EMBED_URL`.
3. Ustaw `NEXT_PUBLIC_BOOKING_ENABLED=true`.
4. Ustaw przekierowanie po udanej płatności na `/dziekujemy-za-rezerwacje/`.
5. Przetestuj rezerwację testową w Calendesk/Stripe przed publikacją.

## Analityka

Kod przygotowuje neutralne zdarzenia:

- `klik_glowne_cta`
- `przejscie_do_wyboru_terminu`
- `rozpoczecie_rezerwacji`
- `udana_rezerwacja`
- `udana_platnosc`

Nie wysyłaj do GA4, Meta ani GTM diagnoz, objawów, powodów zgłoszenia, treści formularzy
ani innych danych dotyczących zdrowia.

Zdarzenie `udana_platnosc` nie jest uruchamiane na podstawie samego wejścia na stronę
`/dziekujemy-za-rezerwacje/`, ponieważ tę stronę można odwiedzić bez płatności.
Po stronie Calendesk/Stripe trzeba skonfigurować wywołanie zdarzenia dopiero po realnym
potwierdzeniu płatności, np. przez webhook, integrację GTM albo zweryfikowane zdarzenie
po stronie systemu rezerwacyjnego.

W kodzie dostępne są hooki:

- `trackBookingConfirmed` w `src/lib/booking-events.ts`
- `trackPaymentConfirmed` w `src/lib/booking-events.ts`

## UTM

CTA i link do Calendesk zachowują wyłącznie neutralne parametry:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Nie dodawaj do adresów URL informacji o trudnościach, objawach ani powodach zgłoszenia.
