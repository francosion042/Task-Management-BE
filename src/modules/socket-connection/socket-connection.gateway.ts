import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/middleware/ws-jwt.middleware';

@WebSocketGateway()
// @UseGuards(SocketJwtAuthGuard)
export class SocketConnectionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    console.log('Socket Initialized');
    client.use(SocketAuthMiddleware() as any);
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
