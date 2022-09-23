import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './config/database'
import { AdminModule } from './modules/admin/admin.module'
import { ClientModule } from './modules/client/client.module'
import { AuthModule } from './modules/auth/auth.module'
import { EmployeeModule } from './modules/employee/employee.module'
import { MailModule } from './mail/mail.module'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './modules/role/role.module'
import { PermissionModule } from './modules/permission/permission.module'
import { RolePermissionModule } from './modules/role_permission/role_permission.module'
import { ClinicModule } from './modules/clinic/clinic.module'
import { EmployeeClinicModule } from './modules/employee_clinic/employee-clinic.module'
import { ProcedureModule } from './modules/procedure/procedure.module'
import { ProcedureHistoryModule } from './modules/procedure-history/procedure-history.module'
import { ClientProcedureModule } from './modules/client-procedure/client-procedure.module'
import { BudgetModule } from './modules/budget/budget.module'
import { BudgetItemModule } from './modules/budget-item/budget-item.module'
import { MaterialCategoryModule } from './modules/material-category/material-category.module'
import { MaterialModule } from './modules/material/material.module'
import { ExamsModule } from './modules/exams/exams.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard'
import { PermissionGuard } from './modules/auth/permission.guard'

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
    ClinicModule,
    EmployeeClinicModule,
    ProcedureModule,
    ProcedureHistoryModule,
    ClientProcedureModule,
    BudgetModule,
    BudgetItemModule,
    MaterialCategoryModule,
    MaterialModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
