# Własny system rezerwacji

## Audyt projektu

- Framework: Next.js 16, App Router, statyczny export do `out/`.
- Hosting: Cloudflare Pages, deploy przez Wrangler.
- Backend przed zmianą: brak API routes i brak bazy danych.
- Stary system: embed Calendly na `/rezerwacja`, przekierowanie `/umow`.
- Analityka: GA4 przez `G-H4WF3HCYL8`; Meta Pixel nie był wcześniej wpięty.
- Stripe: brak wcześniejszej integracji.
- Google Calendar: brak wcześniejszej integracji.
- Formularze: formularz kontaktowy Web3Forms; nie jest używany do danych rezerwacji.

## Architektura

Frontend pozostaje statyczny. Dynamiczne elementy obsługują Cloudflare Pages Functions:

- `GET /api/booking/availability` - zwraca wyłącznie dostępne terminy.
- `POST /api/booking/checkout` - sprawdza termin, tworzy hold w D1 i Stripe Checkout Session.
- `POST /api/booking/cancel` - zwalnia nieopłacony hold po powrocie klienta ze Stripe z anulowaną płatnością.
- `GET /api/booking/status?reservation_id=...` - zwraca publiczny status opłaconej rezerwacji.
- `GET /api/admin/bookings` - lista rezerwacji dla panelu admina.
- `POST /api/admin/bookings` - ręczne zwolnienie albo anulowanie rezerwacji.
- `GET /api/admin/schedule` - aktualny grafik, dodatkowe terminy i blokady.
- `POST /api/admin/schedule` - zapis grafiku, wyjątków i blokad.
- `POST /api/stripe/webhook` - potwierdza płatność Stripe i tworzy Google Calendar / Google Meet.

Baza D1:

- `booking_reservations` - holdy, płatności i identyfikatory Google Calendar.
- `stripe_webhook_events` - idempotencja webhooków Stripe.
- `booking_schedule_config` - edytowalny grafik widoczny w panelu.
- `booking_extra_slots` - pojedyncze dodatkowe terminy poza stałym grafikiem.
- `booking_blackouts` - ręczne blokady dni albo godzin.
- `booking_reservation_overrides` - ręczne zwolnienia/anulowania rezerwacji.

## Konfiguracja rezerwacji

Centralny config jest w `src/lib/booking-settings.ts`.

Tam zmienisz:

- cenę,
- długość wizyty,
- dni pracy,
- godziny pracy,
- minimalne wyprzedzenie,
- przerwę między wizytami,
- maksymalny okres rezerwacji,
- długość holda.

Hold jest ustawiony na 31 minut, bo Stripe Checkout wymaga okna wygaśnięcia co najmniej około 30 minut. Dzięki temu checkout nie powinien pozostać aktywny po zwolnieniu terminu.

Stałe dni pracy, godziny pracy, minimalne wyprzedzenie, zakres rezerwacji i krok slotów można też zmienić w panelu:

```text
https://zdalnypsycholog.pl/admin-rezerwacje/
```

Panel wymaga secretu `BOOKING_ADMIN_TOKEN`. Token nie jest linkiem publicznym i nie powinien trafić do repozytorium.

## ENV

Publiczny frontend:

```bash
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_ANALYTICS_DEBUG=false
```

Cloudflare Pages / Functions:

```bash
BOOKING_SITE_URL=https://zdalnypsycholog.pl
BOOKING_ADMIN_TOKEN=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

GOOGLE_CALENDAR_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_IMPERSONATED_USER_EMAIL=
GOOGLE_SEND_CALENDAR_INVITES=true

META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
META_GRAPH_API_VERSION=v25.0
META_TEST_EVENT_CODE=
```

`STRIPE_PRICE_ID` jest opcjonalny. Jeśli go ustawisz, system użyje istniejącej ceny w Stripe. Jeśli zostanie puste, Checkout utworzy line item z kwotą z `BOOKING_SETTINGS.priceAmount`.

Możesz użyć `GOOGLE_SERVICE_ACCOUNT_JSON` albo pary `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY`. Nie ustawiaj obu wariantów, jeśli nie musisz.

## Stripe

Webhook URL:

```text
https://zdalnypsycholog.pl/api/stripe/webhook
```

Eventy do włączenia:

- `checkout.session.completed`
- `checkout.session.expired`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

### Klik po kliku

1. Wejdź w Stripe Dashboard.
2. Przełącz się na tryb testowy.
3. Wejdź w Developers -> API keys.
4. Skopiuj testowy Secret key do `STRIPE_SECRET_KEY`.
5. Opcjonalnie utwórz produkt i cenę 250 PLN, a Price ID wpisz do `STRIPE_PRICE_ID`.
6. Wejdź w Developers -> Webhooks.
7. Kliknij Add endpoint.
8. Wklej `https://zdalnypsycholog.pl/api/stripe/webhook`.
9. Wybierz eventy `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_succeeded` i `checkout.session.async_payment_failed`.
10. Po zapisaniu skopiuj Signing secret do `STRIPE_WEBHOOK_SECRET`.

Źródłem prawdy o płatności jest webhook. Return URL ze Stripe nie oznacza samodzielnie opłaconej wizyty.

Checkout Session jest oznaczany przez `integration_identifier`, żeby w Stripe Dashboard łatwiej odróżniać ten flow od innych linków płatności.

## Google Calendar

### Klik po kliku

1. Wejdź w Google Cloud Console.
2. Utwórz projekt albo wybierz istniejący projekt dla strony.
3. Wejdź w APIs & Services -> Library.
4. Włącz Google Calendar API.
5. Wejdź w IAM & Admin -> Service Accounts.
6. Utwórz service account.
7. W zakładce Keys dodaj nowy JSON key.
8. Zawartość JSON wklej jako secret `GOOGLE_SERVICE_ACCOUNT_JSON` albo użyj `client_email` i `private_key` jako osobnych secretów.
9. Wejdź w Google Calendar.
10. Otwórz ustawienia konkretnego kalendarza.
11. W sekcji udostępniania dodaj e-mail service account.
12. Nadaj uprawnienie Make changes to events.
13. Skopiuj Calendar ID do `GOOGLE_CALENDAR_ID`.

Jeśli używasz konta Google Workspace i chcesz działać przez impersonację użytkownika, skonfiguruj domain-wide delegation i ustaw `GOOGLE_IMPERSONATED_USER_EMAIL`.

## Meta

Meta Pixel w przeglądarce ładuje się tylko po zaakceptowaniu cookies/analityki.

Server-side Purchase przez Meta CAPI wychodzi z webhooka Stripe, dopiero po `payment_status === "paid"`.

Deduplikacja:

- server CAPI i browser Pixel używają tego samego `event_id`,
- event browserowy odpala się dopiero, gdy `/api/booking/status` zwróci opłacony status.

### Klik po kliku

1. Wejdź w Meta Events Manager.
2. Wybierz właściwy Pixel.
3. Skopiuj Pixel ID do `NEXT_PUBLIC_META_PIXEL_ID` i `META_PIXEL_ID`.
4. Wejdź w Settings wybranego Pixela.
5. W sekcji Conversions API wygeneruj access token.
6. Wklej token do `META_CAPI_ACCESS_TOKEN`.
7. Do testów możesz użyć Test event code i wpisać go do `META_TEST_EVENT_CODE`.

Do Meta nie wysyłamy diagnoz, treści formularzy, powodów konsultacji ani szczegółów zdrowia.

## Test bez prawdziwych pieniędzy

1. Ustaw testowe klucze Stripe.
2. Ustaw testowy webhook secret.
3. Ustaw Google service account i udostępnij mu kalendarz.
4. W Cloudflare dodaj wszystkie wymagane ENV/secrets.
5. Wejdź na `https://zdalnypsycholog.pl/rezerwacja/`.
6. Wybierz termin, podaj dane testowe i przejdź do Stripe Checkout.
7. Użyj testowej karty Stripe `4242 4242 4242 4242`, dowolnej przyszłej daty i CVC.
8. Po powrocie na `/rezerwacja-potwierdzona` poczekaj na status.
9. Sprawdź, czy w Google Calendar powstało wydarzenie z linkiem Meet.
10. Sprawdź w Stripe webhook attempts, czy `checkout.session.completed` ma status `2xx`.
11. Jeśli ustawiono `META_TEST_EVENT_CODE`, sprawdź Purchase w Meta Test Events.

## Bezpieczeństwo

- Sekrety Stripe, Google i Meta są tylko w Cloudflare env/secrets.
- Dostępność z Google Calendar używa FreeBusy, więc klient nie widzi nazw prywatnych wydarzeń.
- Checkout Session powstaje wyłącznie po stronie serwera.
- Stripe webhook weryfikuje podpis i `payment_status === "paid"`.
- Webhooki są idempotentne przez `stripe_webhook_events`.
- Aktywny termin ma unikalny indeks w D1.
- Formularz rezerwacji nie zbiera danych o stanie zdrowia.
