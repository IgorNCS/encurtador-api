import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { Public,Scopes } from 'nest-keycloak-connect';
import { FindAllLinkResponseDTO } from './dto/response/findall-link.response.dto';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';

@Public()
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Public()
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  findAll(@Query() query: PaginationLinkRequest): Promise<FindAllLinkResponseDTO> {
    return this.linkService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
