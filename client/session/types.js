const prefix = type => `inqur/session/${type}`

export const SESSION_STARTED = prefix('SESSION_STARTED')
export const SESSION_RESUMED = prefix('SESSION_RESUMED')
