import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './config/database'
import { AdminModule } from './app/admin/admin.module'
import { ClientModule } from './app/client/client.module'
import { AuthModule } from './app/auth/auth.module'
import { EmployeeModule } from './app/employee/employee.module'
import { MailModule } from './mail/mail.module'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './app/role/role.module'
import { PermissionModule } from './app/permission/permission.module'
import { RolePermissionModule } from './app/role_permission/role_permission.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AdminModule,
    AuthModule,
    ClientModule,
    EmployeeModule,
    MailModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
