import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { AuthGuard, Public,Scopes } from 'nest-keycloak-connect';
import { LinkResponseDTO } from './dto/response/link.response.dto';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Link } from './entities/link.entity';


@ApiTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Public()
  @Post()
  @ApiResponse({ status: 201, description: 'Criação realizada com sucesso', type: Link })
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de links paginada', type: LinkResponseDTO }) 
  findAll(@Query() query: PaginationLinkRequest): Promise<LinkResponseDTO> {
    return this.linkService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Link retornado com sucesso', type: Link })
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Link Atualizado com sucesso', type: Link })
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
