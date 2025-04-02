import { Test, TestingModule } from '@nestjs/testing';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { NotFoundException, Redirect } from '@nestjs/common';

describe('RedirectController', () => {
    let controller: RedirectController;
    let service: RedirectService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RedirectController],
            providers: [
                {
                    provide: RedirectService,
                    useValue: {
                        redirectToOriginalURL: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RedirectController>(RedirectController);
        service = module.get<RedirectService>(RedirectService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('redirectToOriginalUrl', () => {
        it('deve redirecionar para a URL original', async () => {
            const encurtadaURL = 'shortUrl';
            const originalUrl = 'http://www.google.com';

            (service.redirectToOriginalURL as jest.Mock).mockResolvedValue(originalUrl);

            const result = await controller.redirectToOriginalURL(encurtadaURL);

            expect(service.redirectToOriginalURL).toHaveBeenCalledWith(encurtadaURL);
            expect(result).toEqual({ url: originalUrl });
        });

        it('deve lancar um erro caso a URL nao seja encontrada', async () => {
            const encurtadaURL = 'shortUrl';

            (service.redirectToOriginalURL as jest.Mock).mockRejectedValue(
                new NotFoundException(
                    `URL encurtada ${encurtadaURL} nao foi encontrada.`,
                ),
            );

            await expect(controller.redirectToOriginalURL(encurtadaURL)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });
});
