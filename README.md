# TrustCaptcha for Svelte

A Svelte 5 component for integrating [TrustCaptcha](https://www.trustcomponent.com/) CAPTCHA widget into your Svelte applications.

## Features

- ✅ Full Svelte 5 support with runes
- ✅ TypeScript support with complete type definitions
- ✅ All TrustCaptcha widget properties, methods, and events
- ✅ SSR compatible
- ✅ Customizable themes (light, dark, media)
- ✅ Custom translations and design
- ✅ Invisible CAPTCHA mode
- ✅ Autostart configuration
- ✅ License-based premium features

## Installation

```bash
npm install trustcaptcha-svelte
```

or

```bash
pnpm add trustcaptcha-svelte
```

or

```bash
yarn add trustcaptcha-svelte
```

## Basic Usage

```svelte
<script lang="ts">
	import { TrustCaptcha } from 'trustcaptcha-svelte';
</script>

<form>
	<TrustCaptcha sitekey="your_site_key_here" />
</form>
```

## Properties

| Property             | Type                                                       | Default                   | Description                                             |
| -------------------- | ---------------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| `sitekey`            | `string`                                                   | **required**              | Your CAPTCHA site key from the TrustCaptcha admin panel |
| `width`              | `'fixed' \| 'full'`                                        | `'fixed'`                 | Width of the component                                  |
| `language`           | `string`                                                   | `'auto'`                  | Display language (auto, en, de, fr, es, etc.)           |
| `theme`              | `'light' \| 'dark' \| 'media'`                             | `'light'`                 | Visual theme                                            |
| `autostart`          | `boolean`                                                  | `true`                    | Start verification automatically on form interaction    |
| `license`            | `string`                                                   | -                         | License key for premium features                        |
| `hideBranding`       | `boolean`                                                  | `false`                   | Hide TrustCaptcha logo (requires license)               |
| `invisible`          | `boolean`                                                  | `false`                   | Enable invisible mode (requires license)                |
| `invisibleHint`      | `'inline' \| 'right-border' \| 'right-bottom' \| 'hidden'` | `'right-border'`          | Position of invisible mode hint                         |
| `bypassToken`        | `string`                                                   | -                         | Bypass token for automated testing                      |
| `mode`               | `'standard' \| 'minimal'`                                  | `'standard'`              | Data mode of the CAPTCHA                                |
| `tokenFieldName`     | `string`                                                   | `'tc-verification-token'` | Name of hidden input field for token                    |
| `customTranslations` | `string \| CustomTranslation[]`                            | -                         | Custom text translations                                |
| `customDesign`       | `string \| CustomDesign`                                   | -                         | Custom design configuration (requires license)          |
| `privacyUrl`         | `string`                                                   | -                         | Link to your privacy policy (requires license)          |

## Events

| Event              | Description                               | Detail Type                                |
| ------------------ | ----------------------------------------- | ------------------------------------------ |
| `oncaptchaStarted` | Fired when CAPTCHA verification starts    | `CustomEvent`                              |
| `oncaptchaSolved`  | Fired when CAPTCHA is successfully solved | `CustomEvent<string>` (verification token) |
| `oncaptchaFailed`  | Fired when CAPTCHA verification fails     | `CustomEvent<CaptchaError>`                |
| `oncaptchaReset`   | Fired when CAPTCHA is reset               | `CustomEvent`                              |

## Methods

You can call these methods using a component reference:

```svelte
<script lang="ts">
	import { TrustCaptcha } from 'trustcaptcha-svelte';

	let captchaRef: { startVerification: () => void; reset: () => void } | undefined;

	function manualStart() {
		captchaRef?.startVerification();
	}

	function resetCaptcha() {
		captchaRef?.reset();
	}
</script>

<TrustCaptcha bind:this={captchaRef} sitekey="your_site_key_here" />

<button onclick={manualStart}>Start CAPTCHA</button>
<button onclick={resetCaptcha}>Reset CAPTCHA</button>
```

### Available Methods

- `startVerification()` - Manually start the CAPTCHA verification
- `reset()` - Reset the CAPTCHA to initial state

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type {
	TrustCaptchaProps,
	CaptchaError,
	ErrorCode,
	CustomTranslation,
	CustomDesign,
	ThemeColors
} from 'trustcaptcha-svelte';
```

## Links

- [TrustCaptcha Official Documentation](https://docs.trustcomponent.com/captcha/widget/overview/)
- [TrustCaptcha Website](https://www.trustcomponent.com/)
- [Get your Site Key](https://admin.trustcomponent.com/)
