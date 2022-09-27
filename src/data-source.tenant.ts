import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { databaseTenantConfig } from './config/database'

export const AppDataSourceTenant = (schemaName: string) =>
  new DataSource({ ...databaseTenantConfig, schema: schemaName, name: schemaName })
