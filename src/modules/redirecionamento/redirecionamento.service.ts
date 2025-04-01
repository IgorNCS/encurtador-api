import { Injectable } from '@nestjs/common';
import { LinkService } from '../link/link.service';

@Injectable()
export class RedirecionamentoService {
  constructor(private readonly linkService: LinkService) {}

  async redirecionarParaOriginalUrl(encurtadaURL: string): Promise<string> {
    try {
      const originalUrl = await this.linkService.findOneByEncurtadaURL(encurtadaURL);
      await this.linkService.incrementClicks(encurtadaURL);
      return originalUrl.originalURL;
    } catch (error) {
      throw error;
    }
  }
}
