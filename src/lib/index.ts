export { default as TrustCaptcha } from './captcha.svelte';
import type { Snippet } from 'svelte';

export interface TrustCaptchaProps {
	/** Sitekey of the TrustCaptcha. You can find this on the administration page of your TrustCaptcha. */
	sitekey: string;
	/** Width of the TrustCaptcha component. @default 'fixed' */
	width?: 'fixed' | 'full';
	/** Display language of the TrustCaptcha component. @default 'auto' */
	language?:
		| 'auto'
		| 'ar'
		| 'be'
		| 'bg'
		| 'bs'
		| 'ca'
		| 'cs'
		| 'da'
		| 'de'
		| 'el'
		| 'en'
		| 'es'
		| 'et'
		| 'fi'
		| 'fr'
		| 'hi'
		| 'hr'
		| 'hu'
		| 'it'
		| 'ko'
		| 'lb'
		| 'lt'
		| 'lv'
		| 'mk'
		| 'nl'
		| 'no'
		| 'pl'
		| 'pt'
		| 'ro'
		| 'ru'
		| 'sk'
		| 'sl'
		| 'sq'
		| 'sr'
		| 'sv'
		| 'tr'
		| 'uk'
		| 'zh';
	/** Display mode of the TrustCaptcha component. @default 'light' */
	theme?: 'light' | 'dark' | 'media';
	/** Setting whether the CAPTCHA should start automatically. @default true */
	autostart?: boolean;
	/** License key for special features such as privacyUrl, hideBranding, customDesign or invisible. */
	license?: string;
	/** Setting to hide the TrustCaptcha logo. License key required. @default false */
	hideBranding?: boolean;
	/** Setting to make the CAPTCHA invisible. License key required. @default false */
	invisible?: boolean;
	/** Shows a small message when the CAPTCHA runs invisibly. License key required. @default 'right-border' */
	invisibleHint?: 'inline' | 'right-border' | 'right-bottom' | 'hidden';
	/** For automated tests, bypass keys can be created in the settings to always pass the CAPTCHA. */
	bypassToken?: string;
	/** Set the data mode of the captcha. Must match the settings of the captcha. @default 'standard' */
	mode?: 'standard' | 'minimal';
	/** Name of the hidden field within the form in which the verification token is provided after a successful verification. @default 'tc-verification-token' */
	tokenFieldName?: string;
	/** Overwrite existing translations and/or add additional languages. JSON array as a string or object. */
	customTranslations?: string | CustomTranslation[];
	/** Custom design adjustments for the TrustCaptcha component. License key required. JSON as a string or object. */
	customDesign?: string | CustomDesign;
	/** Link to your privacy policy. License key required. */
	privacyUrl?: string;
	/** Triggered when the CAPTCHA is started. */
	oncaptchaStarted?: (event: CustomEvent) => void;
	/** Triggered when the CAPTCHA has been successfully solved. */
	oncaptchaSolved?: (event: CustomEvent<string>) => void;
	/** Triggered when solving the CAPTCHA has failed. */
	oncaptchaFailed?: (event: CustomEvent<CaptchaError>) => void;
	/** Triggered when the CAPTCHA is reset to the start setting. */
	oncaptchaReset?: (event: CustomEvent) => void;
	/** Custom CSS class for the TrustCaptcha component. */
	class?: string;
	/** Optional loading placeholder content shown while the CAPTCHA script is loading. */
	children?: Snippet;
}

export interface CaptchaError {
	errorCode: ErrorCode;
	message: string;
}

export type ErrorCode =
	| 'UNKNOWN_ERROR'
	| 'NO_FORM_FOUND'
	| 'COMMUNICATION_FAILURE'
	| 'NO_SITE_KEY_SPECIFIED'
	| 'UNAUTHORIZED'
	| 'SITE_KEY_NOT_VALID'
	| 'MODES_NOT_MATCHING'
	| 'CAPTCHA_NOT_ACCESSIBLE'
	| 'POW_FAILURE'
	| 'PAYMENT_REQUIRED'
	| 'LOCKED'
	| 'LICENSE_INVALID'
	| 'OPTION_NOT_AVAILABLE';

export interface CustomTranslation {
	language: string;
	boxStart?: string;
	boxInProgress?: string;
	boxCompleted?: string;
	endPrivacyPolicy?: string;
	ariaLabelStart?: string;
	ariaLabelRunning?: string;
	ariaLabelDone?: string;
	srRunning?: string;
	srDone?: string;
	srFailed?: string;
	srTrustcaptcha?: string;
	srPrivacy?: string;
}

export interface CustomDesign {
	rounding?: {
		box?: string;
		checkbox?: string;
		invisibleHint?: string;
	};
	theme?: {
		light?: ThemeColors;
		dark?: ThemeColors;
	};
}

export interface ThemeColors {
	boxDefaultBackground?: string;
	boxDefaultText?: string;
	boxDefaultBorder?: string;
	boxCheckboxBackground?: string;
	boxCheckboxBorder?: string;
	boxSuccessBackground?: string;
	boxSuccessBorder?: string;
	invisibleHintBackground?: string;
}
