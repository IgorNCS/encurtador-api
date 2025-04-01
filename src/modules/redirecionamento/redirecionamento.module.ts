import { Module } from '@nestjs/common';
import { RedirecionamentoService } from './redirecionamento.service';
import { RedirecionamentoController } from './redirecionamento.controller';
import { LinkService } from '../link/link.service';
import { Link } from '../link/entities/link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Link])],
  controllers: [RedirecionamentoController],
  providers: [RedirecionamentoService,LinkService],
})
export class RedirecionamentoModule {}
