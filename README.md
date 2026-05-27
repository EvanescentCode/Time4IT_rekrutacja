# Time4IT Rekrutacja

Projekt zawiera automatyczne testy E2E napisane w TypeScript z użyciem Playwright. Testy korzystają z podejścia Page Object Model, dzięki czemu logika stron jest wydzielona do katalogu `pages`, a scenariusze testowe znajdują się w katalogu `tests`.

## Wymagania

- Node.js 18 lub nowszy
- npm

## Instalacja

```bash
npm install
npx playwright install
```

## Konfiguracja

Utwórz plik `.env` w katalogu głównym projektu i uzupełnij dane testowe:

```env
BASE_URL=https://adres-testowanej-aplikacji.pl
TEST_USER_EMAIL=adres@email.pl
TEST_USER_PASSWORD=haslo
TEST_ORDER_ID=12345
TEST_ORDER_STATUS=Nowy status
```

Zmienne są wczytywane w `playwright.config.ts`, a wymagane dane testowe pobierane przez `utils/env.ts`.

## Uruchamianie testów

Uruchomienie wszystkich testów:

```bash
npm test
```

Uruchomienie testów zamówień:

```bash
npm run test:orders
```

Uruchomienie Playwright UI:

```bash
npm run test:ui
```

## Struktura projektu

```text
pages/                 Page Object Model dla testowanych widoków
tests/                 Scenariusze testowe
utils/                 Funkcje pomocnicze i obsługa zmiennych środowiskowych
playwright.config.ts   Konfiguracja Playwright
```

## Zakres testów

Aktualny scenariusz dla zamówień obejmuje:

- logowanie do systemu,
- przejście do listy zamówień,
- wyszukanie zamówienia po ID,
- otwarcie szczegółów zamówienia,
- zmianę statusu,
- wygenerowanie etykiety i sprawdzenie komunikatu sukcesu.

## Raport

Po uruchomieniu testów Playwright generuje raport HTML. Można go otworzyć poleceniem:

```bash
npx playwright show-report
```
