import { Injectable } from '@nestjs/common';
import { LinkService } from '../link/link.service';

@Injectable()
export class RedirecionamentoService {
  constructor(private readonly linkService: LinkService) {}

  async redirecionarParaOriginalUrl(shortenedURL: string): Promise<string> {
    try {
      const originalUrl =
        await this.linkService.findOneByEncurtadaURL(shortenedURL);
      await this.linkService.incrementClicks(shortenedURL);
      return originalUrl.originalURL;
    } catch (error) {
      throw error;
    }
  }
}
