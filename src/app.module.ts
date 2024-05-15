import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { IsUniqueConstraint } from './common/custom-validators/is-unique.validator';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { TaskColumnModule } from './modules/task-column/task-column.module';
import { ExistsConstraint } from './common/custom-validators/exists.validator';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    TaskModule,
    TaskColumnModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (configService: DatabaseService) =>
        configService.postgresConfig,
      inject: [DatabaseService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // registered custom class
    IsUniqueConstraint,
    ExistsConstraint,
  ],
})
export class AppModule {}
