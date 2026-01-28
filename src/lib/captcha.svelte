<script lang="ts">
	import { onMount } from 'svelte';
	import type { TrustCaptchaProps } from './index.js';

	let {
		autostart,
		hideBranding,
		invisible,
		invisibleHint,
		bypassToken,
		tokenFieldName,
		customTranslations,
		customDesign,
		privacyUrl,
		oncaptchaStarted,
		oncaptchaSolved,
		oncaptchaFailed,
		oncaptchaReset,
		children,
		...rest
	}: TrustCaptchaProps = $props();

	let captchaElement: HTMLElement | null = $state(null);
	let mounted = $state(false);
	let scriptLoaded = $state(false);

	const customTranslationsStr = $derived(
		typeof customTranslations === 'object' ? JSON.stringify(customTranslations) : customTranslations
	);

	const customDesignStr = $derived(
		typeof customDesign === 'object' ? JSON.stringify(customDesign) : customDesign
	);

	onMount(() => {
		mounted = true;

		if (typeof customElements !== 'undefined' && customElements.get('trustcaptcha-component')) {
			scriptLoaded = true;
			return;
		}

		const script = document.createElement('script');
		script.type = 'module';
		script.src = 'https://cdn.trustcomponent.com/trustcaptcha/2.1.x/trustcaptcha.esm.min.js';
		script.onload = () => {
			scriptLoaded = true;
		};
		document.head.appendChild(script);

		return () => {
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	});

	$effect(() => {
		if (!captchaElement || !scriptLoaded || !mounted) return;

		const handlers: Record<string, EventListener | undefined> = {
			captchaStarted: oncaptchaStarted as EventListener | undefined,
			captchaSolved: oncaptchaSolved as EventListener | undefined,
			captchaFailed: oncaptchaFailed as EventListener | undefined,
			captchaReset: oncaptchaReset as EventListener | undefined
		};

		for (const [event, handler] of Object.entries(handlers)) {
			if (handler) {
				captchaElement.addEventListener(event, handler);
			}
		}

		return () => {
			for (const [event, handler] of Object.entries(handlers)) {
				if (handler) {
					captchaElement!.removeEventListener(event, handler);
				}
			}
		};
	});

	export function startVerification(): void {
		(captchaElement as HTMLElement & { startVerification: () => void })?.startVerification();
	}

	export function reset(): void {
		(captchaElement as HTMLElement & { reset: () => void })?.reset();
	}
</script>

{#if mounted && scriptLoaded}
	<trustcaptcha-component
		bind:this={captchaElement}
		autostart={autostart ? undefined : 'false'}
		hide-branding={hideBranding ? 'true' : undefined}
		invisible={invisible ? 'true' : undefined}
		invisible-hint={invisibleHint}
		bypass-token={bypassToken}
		token-field-name={tokenFieldName}
		custom-translations={customTranslationsStr}
		custom-design={customDesignStr}
		privacy-url={privacyUrl}
		{...rest}
	></trustcaptcha-component>
{:else}
	{@render children?.()}
{/if}
