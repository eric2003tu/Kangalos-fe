# AI GUIDE to Kangalos Frontend

Welcome to the Kangalos Frontend Codebase! This file is designed to help AI agents understand, navigate, and contribute to this project efficiently and in line with our standards.

## Project Overview

Kangalos is a modern, full-featured project management platform built with **Next.js** (App Router, TypeScript), React 19, and Tailwind CSS. It serves as a unified hub for managing research projects, student theses, community innovations, and externally funded initiatives at the University of Rwanda and its partner institutions.

### Key Technologies

- **Next.js 15+** (App Router, SSR, API routes)
- **TypeScript** (strict mode)
- **React 19** (functional components, hooks)
- **Tailwind CSS** (utility-first styling)
- **Radix UI** (accessible UI primitives)
- **Zod** (schema validation)
- **React Hook Form** (forms)
- **next-intl** (i18n, translations)
- **TanStack React Query** (data fetching and caching)

### Folder Structure

- `/src/app` – Next.js app directory (routing, layouts, pages)
- `/src/components` – Reusable UI components (atomic design)
- `/src/features` – Domain-driven feature modules (auth, users, reports, projects etc.)
- `/src/messages` – Translation files (JSON, one per locale)
- `/src/i18n` – Internationalization logic (routing, helpers)
- `/public` – Static assets (images, favicons)

### Internationalization

- Uses `next-intl` for translations and locale routing.
- Supported locales: `en`, `fr`, `ko` (see `/src/messages`).
- All user-facing text must be translatable using the translation system.

### Coding Conventions

- All code must be written in **TypeScript**.
- Use functional React components and hooks.
- Follow the existing code style (see `.eslintrc`, Prettier if present).
- Use Tailwind CSS for all styling; avoid custom CSS unless necessary.
- Name files and components using PascalCase for components, kebab-case for folders.
- Add JSDoc comments for complex logic and exported functions.

### Features Folder

- Each domain (e.g., auth, users, reports) has its own folder in `/src/features`.
- Feature folders contain components, hooks, services, schemas, and types related to that domain.

### Translations

- All strings must be placed in the appropriate JSON file in `/src/messages`.
- Use the `useTranslations` hook from `next-intl` in components.
- use the file at src\app\[locale]\test\page.tsx as an example to see how translations was made

### Testing & Verification

- Always run `npm run lint` and then `npm run build` after each task to verify code quality and build integrity.
- If tests are present, run `npm test` before submitting code.

### Pull Request Guidelines

When creating a PR (or when you change features locally):

0. if they are related to one feature maintain a markdown file in the pr directory
1. Include a clear, descriptive title and summary of changes.
2. Reference any related issues.
3. Ensure all code passes lint and build checks.
4. Add screenshots for UI changes.
5. Keep PRs focused on a single concern or feature.
6. Ensure all user-facing text is translatable.

### Best Practices for AI

- Analyze the `/src/features` and `/src/messages` folders for context before generating code.
- Use existing patterns for API calls, error handling, and state management.
- Prefer composition over inheritance in React components.
- Keep components small and focused; split logic into hooks/services as needed.
- Use Zod for schema validation and React Hook Form for forms.
- Document any new utilities or helpers.

### Implementing components and adding them to pages

- use the file located in tasks\ui-components-tasks.md to implement all tasks
- after implementing a task please mark it as completes in that file and how you did it please

### Example: Adding a New Feature

1. Create a new folder in `/src/features` (e.g., `/src/features/projects`).
2. Add components, hooks, and services as needed.
3. Add translation keys to all `/src/messages/*.json` files.
4. Use the translation system for all UI text.
5. Run `npm run lint` and `npm run build` to verify.

### Example: Adding a Translation

1. Add the new key to all locale files in `/src/messages`.
2. Use the `useTranslations` hook to access the key in your component.

### Additional Notes

- Do not modify files in `/public` directly except for static assets.
- Do not hardcode any user-facing text; always use translations.
- Use environment variables for secrets and API endpoints.
