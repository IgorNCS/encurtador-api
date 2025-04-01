import { Test, TestingModule } from '@nestjs/testing';
import { RedirecionamentoController } from './redirecionamento.controller';
import { RedirecionamentoService } from './redirecionamento.service';

describe('RedirecionamentoController', () => {
  let controller: RedirecionamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirecionamentoController],
      providers: [RedirecionamentoService],
    }).compile();

    controller = module.get<RedirecionamentoController>(RedirecionamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
