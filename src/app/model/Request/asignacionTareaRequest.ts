

export type ListAsignacionTareaRequest = AsignacionTareaRequest[]

export interface AsignacionTareaRequest {
  Id: number
  NameTarea: string
  NameUsuario: string
  DescriptionTarea: string
  IsCompleted: boolean
}


