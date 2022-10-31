import { Owner } from "../core/owner";
import { OwnerFromId } from "../core/todo";

const owners: Set<Owner> =  new Set()

export const addOwer = async (owner: Owner) =>  owners.add(owner)

export const ownerFromId: OwnerFromId = async (id: string): Promise<Owner | undefined> => {
    return Array.from(owners).find((owner: Owner) => owner === id)
}