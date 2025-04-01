import { Test, TestingModule } from '@nestjs/testing';
import { RedirecionamentoController } from './redirecionamento.controller';
import { RedirecionamentoService } from './redirecionamento.service';
import { NotFoundException, Redirect } from '@nestjs/common';

describe('RedirecionamentoController', () => {
    let controller: RedirecionamentoController;
    let service: RedirecionamentoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RedirecionamentoController],
            providers: [
                {
                    provide: RedirecionamentoService,
                    useValue: {
                        redirecionarParaOriginalUrl: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RedirecionamentoController>(RedirecionamentoController);
        service = module.get<RedirecionamentoService>(RedirecionamentoService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('redirectToOriginalUrl', () => {
        it('deve redirecionar para a URL original', async () => {
            const encurtadaURL = 'shortUrl';
            const originalUrl = 'http://www.google.com';

            (service.redirecionarParaOriginalUrl as jest.Mock).mockResolvedValue(originalUrl);

            const result = await controller.redirectToOriginalUrl(encurtadaURL);

            expect(service.redirecionarParaOriginalUrl).toHaveBeenCalledWith(encurtadaURL);
            expect(result).toEqual({ url: originalUrl });
        });

        it('deve lancar um erro caso a URL nao seja encontrada', async () => {
            const encurtadaURL = 'shortUrl';

            (service.redirecionarParaOriginalUrl as jest.Mock).mockRejectedValue(
                new NotFoundException(
                    `URL encurtada ${encurtadaURL} nao foi encontrada.`,
                ),
            );

            await expect(controller.redirectToOriginalUrl(encurtadaURL)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });
});
