type PermissionObject = { Manage?: string; Create?: string; Read?: string; Update?: string; Delete?: string }
type PermissionFields = {
  auth: PermissionObject
  budget: PermissionObject
  budgetItem: PermissionObject
  client: PermissionObject
  clientProcedure: PermissionObject
  clinic: PermissionObject
  employee: PermissionObject
  employeeClinic: PermissionObject
  exams: PermissionObject
  stock: PermissionObject
  stockCategory: PermissionObject
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
  auth: {},
  budget: {},
  budgetItem: {},
  client: {},
  clientProcedure: {},
  clinic: {},
  employee: {},
  employeeClinic: {},
  exams: {},
  stock: {},
  stockCategory: {},
  permission: {},
  procedure: {},
  procedureHistory: {},
  role: {},
  rolePermission: {},
}

const _controllers = Object.keys(permissions)
let permissionsQuery = 'INSERT INTO ":schema".permission (name) VALUES '

for (const controller of _controllers) {
  for (const permission of _permissions) {
    Object.assign(permissions[controller], { [permission]: `${controller}_${permission}` })
    permissionsQuery += `('${controller}_${permission}'),`
  }
}

permissionsQuery = permissionsQuery.slice(0, -1)

const getPermissionsQuery = (schema: string) => {
  return permissionsQuery.replace(':schema', schema)
}

export { permissions, sufixPermissions, getPermissionsQuery }
