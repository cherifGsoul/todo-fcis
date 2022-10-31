export type TodoName = Readonly<string>

export const fromString = (s: string): TodoName => {
    const isValidName = typeof s === 'string' && s.length > 0
    if (!isValidName) {
        throw Error('todo name is invalid')
    }
    return s
}