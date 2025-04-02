import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { RedirectService } from './redirect.service';



@Public()
@Controller('')
export class RedirectController {
  constructor(private readonly redirecionamentoService: RedirectService) {}


  @Get(':encurtadaUrl')
  @ApiResponse({
    status: 302,
    description: 'Redireciona para a URL original',
    schema: {
      example: {
        url: 'http://www.exemplo.com',
      },
    },
  })
  @Redirect('', 302)
  async redirectToOriginalURL(@Param('encurtadaUrl') encurtadaUrl: string) {
      const originalUrl = await this.redirecionamentoService.redirectToOriginalURL(encurtadaUrl);
      return { url: originalUrl };
  }

}

