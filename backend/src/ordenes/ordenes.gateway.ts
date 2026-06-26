import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrdenesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Pantalla conectada al socket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Pantalla desconectada: ${client.id}`);
  }
}