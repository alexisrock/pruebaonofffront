export interface UserCreateRequest {
  NameUsuario: string
  Email: string
  Password: string
}



export interface UserupdateRequest {
  Id: number
  NameUsuario: string
  Email: string
  Password: string
  Idrol: number
}
