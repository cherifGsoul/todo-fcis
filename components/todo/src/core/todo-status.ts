export type TodoStatus = 'open' | 'done'

export const open = (): TodoStatus => 'open'
export const done = (): TodoStatus => 'done'