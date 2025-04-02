import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class KeycloakUserMiddleware implements NestMiddleware {
  constructor(
    private readonly userService:UserService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    
    const user = (req as Record<string, any>).user;

    if (user) {
      this.userService.create(user);


    } else if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const decoded =jwt.decode(token) as any; 
        this.userService.create(decoded);

      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }
    }
    
    next();
  }
}