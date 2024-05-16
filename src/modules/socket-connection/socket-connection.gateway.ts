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
import { Task } from '../task/entities/task.entity';
import { TaskColumn } from '../task-column/entities/task-column.entity';

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

    // Add the Client to the Room of active viewers of the project
    const { projectId } = client.handshake.query;
    client.join(projectId);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);

    const { projectId } = client.handshake.query;
    client.leave(String(projectId));
  }

  @SubscribeMessage('new:taskColumn')
  handleNewTaskColumn(@MessageBody() data: TaskColumn) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to(String(data.projectId)).emit('new:taskColumn', data);
  }

  @SubscribeMessage('update:taskColumn')
  handleUpdateTaskColumn(@MessageBody() data: TaskColumn) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to(String(data.projectId)).emit('update:taskColumn', data);
  }

  @SubscribeMessage('new:task')
  handleNewTask(@MessageBody() data: Task) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to(String(data.projectId)).emit('new:task', data);
  }

  @SubscribeMessage('update:task')
  handleUpdateTask(@MessageBody() data: Task) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to(String(data.projectId)).emit('update:task', data);
  }

  @SubscribeMessage('delete:task')
  handleDeleteTask(@MessageBody() data: Task) {
    console.log(data);
    // Broadcast to the specified project
    this.server.to(String(data.projectId)).emit('delete:task', data);
  }
}
