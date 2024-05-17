import { Injectable } from '@nestjs/common';
import { SocketConnectionGateway } from './socket-connection.gateway';

type DataType = {
  projectId: number;
  [key: string]: any;
};
@Injectable()
export class SocketConnectionService {
  constructor(
    private readonly socketConnectionGateway: SocketConnectionGateway,
  ) {}

  broadcast(message: string, data: DataType) {
    this.socketConnectionGateway.server
      .to(String(data.projectId))
      .emit(message, data);
  }
}
