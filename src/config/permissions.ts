type PermissionObject = { Manage?: string; Create?: string; Read?: string; Update?: string; Delete?: string }
type PermissionFields = {
  admin: PermissionObject
  auth: PermissionObject
  budget: PermissionObject
  budgetItem: PermissionObject
  client: PermissionObject
  clientProcedure: PermissionObject
  clinic: PermissionObject
  employee: PermissionObject
  employeeClinic: PermissionObject
  exams: PermissionObject
  material: PermissionObject
  materialCategory: PermissionObject
  permission: PermissionObject
  procedure: PermissionObject
  procedureHistory: PermissionObject
  role: PermissionObject
  rolePermission: PermissionObject
}

const sufixPermissions: PermissionObject = {
  Manage: 'Manage',
  Create: 'Create',
  Read: 'Read',
  Update: 'Update',
  Delete: 'Delete',
}

const _permissions = Object.values(sufixPermissions)

const permissions: PermissionFields = {
  admin: {},
  auth: {},
  budget: {},
  budgetItem: {},
  client: {},
  clientProcedure: {},
  clinic: {},
  employee: {},
  employeeClinic: {},
  exams: {},
  material: {},
  materialCategory: {},
  permission: {},
  procedure: {},
  procedureHistory: {},
  role: {},
  rolePermission: {},
}

const _controllers = Object.keys(permissions)
let query = 'INSERT INTO permission (name) VALUES '

for (const controller of _controllers) {
  for (const permission of _permissions) {
    Object.assign(permissions[controller], { [permission]: `${controller}_${permission}` })
    query += `('${controller}_${permission}'),`
  }
}

query = query.slice(0, -1)

export { permissions, sufixPermissions, query }
