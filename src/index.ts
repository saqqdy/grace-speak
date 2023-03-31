import { extend } from 'js-cool'
import { inBrowser, isChrome } from './utils'

// ;(this as any).graceSpeakReady = false
// ;(() => {
// 	if (!inBrowser) return
// 	if (typeof window.speechSynthesis === 'undefined') {
// 		console.error('speechSynthesis is not supported')
// 		return
// 	}

// 	const handler = () => {
// 		speech.speak(new SpeechSynthesisUtterance(''))
// 		;(this as any).graceSpeakReady = speech.speaking || speech.pending
// 		window.removeEventListener('click', handler)
// 		window.removeEventListener('keypress', handler)
// 	}
// 	window.addEventListener('click', handler)
// 	window.addEventListener('keypress', handler)
// })()

declare global {
	interface Window {
		graceSpeakReady: boolean
	}
}

export interface SpeechOptions {
	preferTouchEvent: boolean
	voiceFilter: ((voice: SpeechSynthesisVoice) => boolean) | null
	lang: 'zh-CN' | string
	pitch: number
	rate: number
	volume: number
}

export type UtterOptions = Partial<
	Pick<
		SpeechSynthesisUtterance,
		| 'lang'
		| 'onboundary'
		| 'onend'
		| 'onerror'
		| 'onmark'
		| 'onpause'
		| 'onresume'
		| 'onstart'
		| 'pitch'
		| 'rate'
		| 'text'
		| 'voice'
		| 'volume'
	>
>

export interface Effect {
	key: symbol
	content: string
	utterOptions: UtterOptions
}

class Speaker {
	speech: SpeechSynthesis = window.speechSynthesis
	effects: Effect[] = []
	utter: SpeechSynthesisUtterance | null = null
	voice: SpeechSynthesisVoice | undefined = undefined
	ready: boolean = window.graceSpeakReady ?? false
	options: SpeechOptions = {
		preferTouchEvent: false,
		voiceFilter: null,
		lang: 'zh-CN',
		pitch: 1,
		rate: 1,
		volume: 1
	}

	constructor(options: SpeechOptions) {
		if (!inBrowser) return
		if (typeof window.speechSynthesis === 'undefined') {
			console.error('speechSynthesis is not supported')
			return
		}

		this.options = extend(true, this.options, options) as unknown as SpeechOptions

		!this.voice && this.initVoice()
		!this.ready && this.init()
	}

	private initVoice() {
		// voiceschanged
		const handler = () => {
			this.voice = this.getVoice()
			this.speech.removeEventListener('voiceschanged', handler)
		}
		this.speech.addEventListener('voiceschanged', handler)
	}

	private init() {
		if (!isChrome) {
			this.ready = window.graceSpeakReady = true
			return
		}
		const handler = () => {
			this.speech.speak(new SpeechSynthesisUtterance(''))
			this.ready = window.graceSpeakReady = this.speech.speaking || this.speech.pending
			window.removeEventListener('click', handler)
			window.removeEventListener('keypress', handler)
		}
		window.addEventListener('click', handler)
		window.addEventListener('keypress', handler)
	}

	/**
	 * get voice
	 *
	 * @returns result voice: SpeechSynthesisVoice
	 */
	public getVoice(): SpeechSynthesisVoice | undefined {
		if (this.voice) return this.voice

		const list = this.speech.getVoices().sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) return -1
			else if (nameA === nameB) return 0
			return 1
		})

		if (this.options.voiceFilter) return list.find(this.options.voiceFilter)
		return (
			list.find(({ lang, localService }) => localService && lang === this.options.lang) ||
			list.find(({ lang }) => lang === this.options.lang)
		)
	}

	/**
	 * get current utter
	 *
	 * @returns result - utter: SpeechSynthesisUtterance
	 */
	public getCurrentUtter(): SpeechSynthesisUtterance | null {
		if (!this.utter) console.warn('no utter right now')
		return this.utter
	}

	/**
	 * speak
	 *
	 * @param content - speak text
	 * @param utterOptions - utter options: UtterOptions
	 * @returns result - effectKey: symbol
	 */
	public speak(content: string, utterOptions: UtterOptions = {}): Effect['key'] {
		const effect = {
			key: Symbol('SpeechKey#effect'),
			content,
			utterOptions
		}
		this.effects = ([] as Effect[]).concat(this.effects, effect)

		return effect.key
	}

	/**
	 * Remove unconsumed speak
	 *
	 * @param effectKey - key of effect
	 * @returns result - cancellation result true=Cancellation success false=Broadcast content not found or broadcast consumed
	 */
	public remove(effectKey: Effect['key']): boolean {
		const _effects = ([] as Effect[]).concat(this.effects)
		const index = _effects.findIndex(({ key }) => key === effectKey)
		if (index > -1) {
			_effects.splice(index, 1)
			this.effects = _effects
			return true
		}
		return false
	}

	/**
	 * Forced cancellation of all broadcasts, and immediate cancellation of those being broadcast
	 */
	public cancel() {
		this.speech.cancel()
	}

	/**
	 * Suspension of all broadcasts and immediate cancellation of those being broadcast
	 */
	public pause() {
		this.speech.pause()
	}

	/**
	 * Resume all broadcasts and immediately cancel those being broadcast
	 */
	public resume() {
		this.speech.resume()
	}
}

export { Speaker, Speaker as default }
