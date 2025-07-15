export type tareasListResponse = Tareas[]

export interface Tareas {
  Id: number
  NameTarea: string
  DescriptionTarea: string
  IsCompleted: boolean
}



export type ListAsignacionTarasUsuario = AsignacionTarasUsuario[]

export interface AsignacionTarasUsuario {
  Id: number
  NameTarea: string
  IsCompleted: boolean
}
