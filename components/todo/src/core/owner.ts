export type Owner = Readonly<string>

export const fromString = (s: string): Owner => {
    const isValidName = typeof s === 'string' && s.length > 0
    if (!isValidName) {
        throw Error('todo name is invalid')
    }
    return s
}

export const equals = (owner: Owner, other: Owner) => owner === other