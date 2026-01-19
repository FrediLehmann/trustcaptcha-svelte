# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TrustComponent is a Svelte 5 wrapper component for integrating TrustCaptcha CAPTCHA widget into Svelte applications. It's published as an NPM package built with SvelteKit.

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build package (vite build + svelte-package + publint)
pnpm check        # Type check with svelte-check
pnpm check:watch  # Type check in watch mode
pnpm lint         # Run ESLint and check Prettier formatting
pnpm format       # Format code with Prettier
pnpm test         # Run tests once (headless)
pnpm test:unit    # Run tests in watch mode
```

## Architecture

### Component Structure

- `src/lib/captcha.svelte` - Main TrustCaptcha wrapper component using Svelte 5 runes (`$props()`, `$state()`, `$derived()`)
- `src/lib/index.ts` - Public exports and TypeScript interfaces (`TrustCaptchaProps`, `CaptchaError`, `CustomTranslation`, `CustomDesign`, `ThemeColors`)
- `src/routes/+page.svelte` - Demo page for local development

### How the Component Works

The component wraps the external TrustCaptcha web component (`<trustcaptcha-component>`). It:

1. Dynamically loads the TrustCaptcha script from CDN in `<svelte:head>`
2. Converts object props to JSON strings for the web component
3. Manages event listener lifecycle (mounted/unmounted) for captcha events
4. Exposes `startVerification()` and `reset()` methods via component binding

### Testing

Tests use Vitest with Playwright for browser component testing:

- Component tests: `**/*.svelte.{test,spec}.{js,ts}`
- Unit tests: `**/*.{test,spec}.{js,ts}`
- Browser tests run in headless Chromium

## Code Style

- Tabs for indentation, single quotes, no trailing commas, 100-char line width
- Uses Svelte 5 runes syntax exclusively
- Strict TypeScript mode enabled

## MCP Tools for Svelte Development

### list-sections

Use FIRST to discover available Svelte 5/SvelteKit documentation sections. Returns titles, use_cases, and paths.

### get-documentation

Retrieves full documentation for sections. After list-sections, analyze use_cases and fetch ALL relevant sections.

### svelte-autofixer

Analyzes Svelte code and returns issues/suggestions. Use whenever writing Svelte code. Keep calling until no issues remain.

### playground-link

Generates Svelte Playground links. Ask user first if they want one. Never use if code was written to project files.
