import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketConnectionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Socket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);

    // Add the Client to the Room of active viewers of the project
    const { projectId } = client.handshake.query;
    client.join(projectId);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);

    const { projectId } = client.handshake.query;
    client.leave(String(projectId));
  }
}
