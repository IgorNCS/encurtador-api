import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class KeycloakUserMiddleware implements NestMiddleware {
  constructor(private readonly clsService: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    
    if ((req as any).user) {
      this.clsService.set('user', (req as any).user);
      console.log('Usuário armazenado no CLS:', (req as any).user);
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const decoded =jwt.decode(token) as any; 
        this.clsService.set('user', decoded);

      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }
    }
    
    next();
  }
}