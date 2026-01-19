<script lang="ts">
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
		...rest
	}: TrustCaptchaProps = $props();

	let captchaElement: HTMLElement | null = $state(null);
	let scriptLoaded = $state(
		typeof customElements !== 'undefined' && !!customElements.get('trustcaptcha-component')
	);

	const customTranslationsStr = $derived(
		typeof customTranslations === 'object' ? JSON.stringify(customTranslations) : customTranslations
	);

	const customDesignStr = $derived(
		typeof customDesign === 'object' ? JSON.stringify(customDesign) : customDesign
	);

	function onScriptLoad() {
		scriptLoaded = true;
	}

	$effect(() => {
		if (!captchaElement || !scriptLoaded) return;

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

<svelte:head>
	<script
		onload={onScriptLoad}
		type="module"
		src="https://cdn.trustcomponent.com/trustcaptcha/2.1.x/trustcaptcha.esm.min.js"
	></script>
</svelte:head>

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
