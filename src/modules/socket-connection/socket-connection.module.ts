import { Module } from '@nestjs/common';
import { SocketConnectionService } from './socket-connection.service';
import { SocketConnectionGateway } from './socket-connection.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [SocketConnectionGateway, SocketConnectionService],
})
export class SocketConnectionModule {}
