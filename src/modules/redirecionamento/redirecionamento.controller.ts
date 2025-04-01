import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { RedirecionamentoService } from './redirecionamento.service';
import { Public } from 'nest-keycloak-connect';


@Public()
@Controller('')
export class RedirecionamentoController {
  constructor(private readonly redirecionamentoService: RedirecionamentoService) {}


  @Get(':encurtadaUrl')
  @Redirect('', 302)
  async redirectToOriginalUrl(@Param('encurtadaUrl') encurtadaUrl: string) {
      const originalUrl = await this.redirecionamentoService.redirecionarParaOriginalUrl(encurtadaUrl);
      return { url: originalUrl };
  }

}

