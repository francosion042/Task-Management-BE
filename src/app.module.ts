import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (configService: DatabaseService) =>
        configService.postgresConfig,
      inject: [DatabaseService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
