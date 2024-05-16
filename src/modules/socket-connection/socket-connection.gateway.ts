import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketConnectionService } from './socket-connection.service';

@WebSocketGateway()
export class SocketConnectionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketConnectionService: SocketConnectionService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Socket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('new:task')
  handleOffer(@MessageBody() data) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to('projectId').emit('new:task', data);
  }
}
