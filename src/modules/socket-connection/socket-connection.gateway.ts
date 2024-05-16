import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketConnectionService } from './socket-connection.service';
import { JoinActiveViewersType } from 'src/common/types';

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

  @SubscribeMessage('joinProjectActiveViewers')
  async handleJoinActiveViewers(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinActiveViewersType,
  ) {
    console.log(`Client ${client.id} Joined Project ${data.projectId}`);

    client.join(String(data.projectId));

    await this.socketConnectionService.addProjectActiveViewer(data.projectId, {
      socketId: client.id,
      userId: data.userId,
    });
  }

  @SubscribeMessage('new:task')
  handleNewTask(@MessageBody() data) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to('projectId').emit('new:task', data);
  }
}
