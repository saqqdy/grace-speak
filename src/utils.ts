import { inBrowser } from 'js-cool'

export const isChrome = inBrowser && navigator.userAgent.includes('Chrome')
