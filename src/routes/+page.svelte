<script lang="ts">
	import Captcha from '$lib/captcha.svelte';
	import type { CaptchaError, CustomTranslation } from '$lib/index.js';

	import { PUBLIC_TRUST_CAPTCHA_KEY } from '$env/static/public';

	let basicCaptcha: Captcha;
	let manualCaptcha: Captcha;
	let combinedCaptcha: Captcha;

	function logEvent(name: string, detail?: unknown) {
		const timestamp = new Date().toLocaleTimeString();
		console.log(`[${timestamp}] ${name}${detail ? `: ${JSON.stringify(detail)}` : ''}`);
	}

	const customTranslations: CustomTranslation[] = [
		{
			language: 'en',
			boxStart: 'Click to verify you are human',
			boxInProgress: 'Verifying...',
			boxCompleted: 'Verification complete!'
		}
	];
</script>

<svelte:head>
	<title>TrustCaptcha Component Test Cases</title>
	<style>
		* {
			box-sizing: border-box;
		}
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: #f5f5f5;
			margin: 0;
			padding: 20px;
		}
	</style>
</svelte:head>

<main>
	<h1>TrustCaptcha Component Test Cases</h1>

	<div class="grid">
		<section class="card">
			<h2>1. Basic Usage</h2>
			<p>Default configuration with all event handlers.</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					bind:this={basicCaptcha}
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					oncaptchaStarted={() => logEvent('captchaStarted')}
					oncaptchaSolved={(e) => {
						logEvent('captchaSolved', e.detail);
					}}
					oncaptchaFailed={(e) => logEvent('captchaFailed', e.detail)}
					oncaptchaReset={() => logEvent('captchaReset')}
				/>
				<button type="submit">Submit</button>
				<button type="button" onclick={() => basicCaptcha.reset()}>Reset</button>
			</form>
		</section>

		<section class="card dark">
			<h2>2. Dark Theme</h2>
			<p>Using theme="dark" for dark mode interfaces.</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					theme="dark"
					oncaptchaStarted={() => logEvent('Dark: captchaStarted')}
					oncaptchaSolved={() => logEvent('Dark: captchaSolved')}
				/>
			</form>
		</section>

		<section class="card">
			<h2>3. Manual Start</h2>
			<p>Using autostart=false, requires calling startVerification().</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					bind:this={manualCaptcha}
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					autostart={false}
					oncaptchaStarted={() => logEvent('Manual: captchaStarted')}
					oncaptchaSolved={() => logEvent('Manual: captchaSolved')}
				/>
				<div class="button-group">
					<button type="button" onclick={() => manualCaptcha.startVerification()}>
						Start Verification
					</button>
					<button type="button" onclick={() => manualCaptcha.reset()}>Reset</button>
				</div>
			</form>
		</section>

		<section class="card">
			<h2>4. Custom Token Field Name</h2>
			<p>Using tokenFieldName="my-captcha-token" for the hidden input.</p>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					logEvent('Custom Token Form', Object.fromEntries(formData));
				}}
			>
				<Captcha
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					tokenFieldName="my-captcha-token"
					oncaptchaSolved={() => logEvent('Custom Token: captchaSolved')}
				/>
				<button type="submit">Submit & Check FormData</button>
			</form>
		</section>

		<section class="card">
			<h2>5. Custom Translations (Object)</h2>
			<p>Passing custom translations as an object.</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					{customTranslations}
					oncaptchaStarted={() => logEvent('Custom Trans: captchaStarted')}
					oncaptchaSolved={() => logEvent('Custom Trans: captchaSolved')}
				/>
			</form>
		</section>

		<section class="card">
			<h2>6. Error Handling (Invalid Sitekey)</h2>
			<p>Testing error callback with an invalid sitekey.</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					sitekey="invalid-sitekey-12345"
					oncaptchaStarted={() => logEvent('Error Test: captchaStarted')}
					oncaptchaFailed={(e: CustomEvent<CaptchaError>) => {
						logEvent('Error Test: captchaFailed', {
							errorCode: e.detail.errorCode,
							message: e.detail.message
						});
					}}
				/>
			</form>
		</section>

		<section class="card dark">
			<h2>7. Combined Options</h2>
			<p>Dark theme + Full width + German + Manual start.</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<Captcha
					bind:this={combinedCaptcha}
					sitekey={PUBLIC_TRUST_CAPTCHA_KEY}
					theme="dark"
					width="full"
					language="de"
					autostart={false}
					oncaptchaStarted={() => logEvent('Combined: captchaStarted')}
					oncaptchaSolved={() => logEvent('Combined: captchaSolved')}
				/>
				<div class="button-group">
					<button type="button" onclick={() => combinedCaptcha.startVerification()}>
						Start Verification
					</button>
					<button type="button" onclick={() => combinedCaptcha.reset()}>Reset</button>
				</div>
			</form>
		</section>
	</div>
</main>

<style>
	main {
		max-width: 1400px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 20px;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.card.dark {
		background: #1a1a1a;
		color: #fff;
	}

	.card.dark h2 {
		color: #fff;
	}

	.card.dark p {
		color: #aaa;
	}

	.card h2 {
		margin-top: 0;
		margin-bottom: 8px;
		font-size: 18px;
		color: #333;
	}

	.card p {
		margin-top: 0;
		margin-bottom: 16px;
		font-size: 14px;
		color: #666;
	}

	form {
		display: block;
	}

	button {
		margin-top: 12px;
		margin-right: 8px;
		padding: 10px 20px;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		transition: background 0.2s;
	}

	button:hover {
		background: #45a049;
	}

	button[type='button'] {
		background: #2196f3;
	}

	button[type='button']:hover {
		background: #1976d2;
	}

	.button-group {
		margin-top: 12px;
	}
</style>
