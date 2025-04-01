import { Test, TestingModule } from '@nestjs/testing';
import { RedirecionamentoService } from './redirecionamento.service';

describe('RedirecionamentoService', () => {
  let service: RedirecionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedirecionamentoService],
    }).compile();

    service = module.get<RedirecionamentoService>(RedirecionamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
