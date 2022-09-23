import { Role } from '../enums/role.enum'

export interface IAccessToken {
  id: number
  email: string
  roleId?: number | null
  clinicId?: number
}

export interface JwtPayload extends IAccessToken {
  permissions: string[]
}

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
