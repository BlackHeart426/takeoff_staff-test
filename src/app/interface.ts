export interface User {
  returnSecureToken?: boolean
  email: string,
  password: string
}

export interface Contact {
  id?: number,
  name: string,
  phone: string,
  date?: Date
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface FbCreateResponse {
  name: string
}
