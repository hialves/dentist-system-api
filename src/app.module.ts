import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './config/database'
import { ClientModule } from './modules/tenanted/client/client.module'
import { AuthModule } from './modules/tenanted/auth/auth.module'
import { EmployeeModule } from './modules/tenanted/employee/employee.module'
import { MailModule } from './mail/mail.module'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './modules/tenanted/role/role.module'
import { PermissionModule } from './modules/tenanted/permission/permission.module'
import { RolePermissionModule } from './modules/tenanted/role_permission/role_permission.module'
import { ClinicModule } from './modules/tenanted/clinic/clinic.module'
import { EmployeeClinicModule } from './modules/tenanted/employee_clinic/employee-clinic.module'
import { ProcedureModule } from './modules/tenanted/procedure/procedure.module'
import { ProcedureHistoryModule } from './modules/tenanted/procedure-history/procedure-history.module'
import { ClientProcedureModule } from './modules/tenanted/client-procedure/client-procedure.module'
import { BudgetModule } from './modules/tenanted/budget/budget.module'
import { BudgetItemModule } from './modules/tenanted/budget-item/budget-item.module'
import { StockCategoryModule } from './modules/tenanted/stock-category/stock-category.module'
import { StockModule } from './modules/tenanted/stock/stock.module'
import { ExamsModule } from './modules/tenanted/exams/exams.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/tenanted/auth/jwt-auth.guard'
import { PermissionGuard } from './modules/tenanted/auth/permission.guard'
import { TenantModule } from './modules/public/tenant/tenant.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
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
    StockCategoryModule,
    StockModule,
    ExamsModule,
    TenantModule,
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
