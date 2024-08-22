/* eslint-disable node/prefer-global/process */

export const isMain = typeof process !== 'undefined' && process.type === 'browser'
export const isRenderer = typeof process === 'undefined' && typeof window !== 'undefined'
