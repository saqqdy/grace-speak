export const inBrowser = typeof window !== 'undefined'

export const isChrome = inBrowser && navigator.userAgent.includes('Chrome')
