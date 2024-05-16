import { Module } from '@nestjs/common';
import { SocketConnectionService } from './socket-connection.service';
import { SocketConnectionGateway } from './socket-connection.gateway';

@Module({
  imports: [],
  providers: [SocketConnectionGateway, SocketConnectionService],
})
export class SocketConnectionModule {}
