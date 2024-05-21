import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

type SocketIMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIMiddleWare => {
  return (client, next) => {
    try {
      const { authorization } = client.handshake.headers;
      if (!authorization) {
        return next(new Error('Authorization Required'));
      }
      const token: string = authorization.split(' ')[1];
      verify(token, new ConfigService().get('JWT_SECRET'));
      next();
    } catch (error) {
      next(error);
    }
  };
};
