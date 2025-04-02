import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { LinkService } from '../link/link.service';
import { Link } from '../link/entities/link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([Link])],
  controllers: [RedirectController],
  providers: [RedirectService,LinkService,UserService],
})
export class RedirectModule {}
