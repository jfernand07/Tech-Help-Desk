import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Mensaje de bienvenida expuesto en "/"
  getHello(): string {
    return 'Bienvenido a Tech Help Desk API - Backend NestJS';
  }
}
