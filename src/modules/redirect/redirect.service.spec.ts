import { Test, TestingModule } from '@nestjs/testing';
import { RedirectService } from './redirect.service';
import { LinkService } from '../link/link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from '../link/entities/link.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RedirectService', () => {
  let service: RedirectService;
  let linkService: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedirectService,
        {
          provide: LinkService,
          useValue: {
            findOneByEncurtadaURL: jest.fn(),
            incrementClicks: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Link),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RedirectService>(RedirectService);
    linkService = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('redirectToOriginalURL', () => {
    it('deve redirecionar para a URL original', async () => {
      const encurtadaURL = 'A1b2C3';
      const originalURL = 'http://www.google.com';

      jest.spyOn(linkService, 'findOneByEncurtadaURL').mockResolvedValue({
        id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f',
        encurtadaURL,
        originalURL,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Link);

      const result = await service.redirectToOriginalURL(encurtadaURL);

      expect(linkService.findOneByEncurtadaURL).toHaveBeenCalledWith(encurtadaURL);
      expect(linkService.incrementClicks).toHaveBeenCalledWith(encurtadaURL);
      expect(result).toEqual(originalURL);
    });

    it('deve lancar um erro caso a URL nao seja encontrada', async () => {
      const encurtadaURL = 'A1b2C3';

      jest.spyOn(linkService, 'findOneByEncurtadaURL').mockRejectedValue(
        new NotFoundException('Link não encontrado')
      );

      await expect(
        service.redirectToOriginalURL(encurtadaURL),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});