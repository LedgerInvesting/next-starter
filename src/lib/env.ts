export const isProduction = process.env.NODE_ENV === 'production'
export const isRunningBuild = process.env.npm_lifecycle_event === 'build'
