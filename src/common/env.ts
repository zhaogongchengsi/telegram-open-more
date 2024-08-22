/* eslint-disable node/prefer-global/process */

export const isMain = process.type === 'browser'
export const isRenderer = typeof process !== 'undefined' && process?.type === 'renderer'
