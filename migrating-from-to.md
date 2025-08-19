# Migrating from URL-based locales to internal locale handling

This document describes the steps taken to remove locale prefixes from the URL and handle language selection internally.

## Steps

1. **Removed `[locale]` route segment**
   - Moved pages and layouts from `src/app/[locale]/` to `src/app/`.
   - All routes such as `/(auth)` and `/dashboard` now live directly under `src/app/`.

2. **Updated root layout**
   - `src/app/layout.tsx`: replaced URL param logic with `getLocale` and `NextIntlClientProvider` using messages loaded for the resolved locale.
   - Adjusted font and stylesheet imports to match new file location.

3. **Simplified middleware**
   - `src/middleware.ts`: removed `next-intl` routing middleware and locale extraction. Middleware now handles only auth guarding and redirects without modifying the pathname.

4. **Load locale from cookies**
   - `src/i18n/request.ts`: reads a `locale` cookie (defaults to `en`) and provides messages accordingly.

5. **Refactored language switching and links**
   - `src/components/global/LanguageSwitcher.tsx` & `src/components/global/reusable-sidebar.tsx`: set the `locale` cookie and refresh the page instead of changing the URL.
   - `src/components/global/UserProfile.tsx` & `src/features/auth/components/LoginForm.tsx`: removed locale prefixes from links and redirects.

6. **Removed obsolete files**
   - Deleted `src/i18n/routing.ts` and `src/i18n/navigation.ts` which were only needed for prefixed routing.

These changes migrate the application to internal locale handling while preserving internationalization support.
