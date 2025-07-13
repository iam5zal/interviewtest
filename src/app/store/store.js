import { hashPassword } from '../utils/crypto'


export const secureStore     = new Map() 
export const rateLimitStore  = new Map() 
export const credentialStore = new Map() 
export const mfaStore        = new Map() 


credentialStore.set('aaa', hashPassword('111'))
credentialStore.set('bob', hashPassword('222'))