import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';
import { FindAllLinkResponseDTO } from './dto/response/findall-link.response.dto';
import { NotFoundException } from '@nestjs/common';

describe('LinkController', () => {
  let controller: LinkController;
  let service: LinkService;

  const mockLinkService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useFactory: mockLinkService,
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('deve chamar linkService.create com o CreateLinkDto fornecido', async () => {
      const createLinkDto: CreateLinkDto = { url: 'http://example.com' };
      await controller.create(createLinkDto);
      expect(service.create).toHaveBeenCalledWith(createLinkDto);
    });

    it('deve lançar NotFoundException se linkService.create lançar NotFoundException', async () => {
      const createLinkDto: CreateLinkDto = { url: 'http://example.com' };
      jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.create(createLinkDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('encontrar todos', () => {
    it('deve chamar linkService.findAll com a query fornecida', async () => {
      const query: PaginationLinkRequest = { page: 1, limit: 10 };
      const expectedResult: FindAllLinkResponseDTO = {
        current_page: 1,
        total_pages: 1,
        total_per_pages: 10,
        list: [],
        totalItems: 0,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);
    });

    it('deve lançar NotFoundException se linkService.findAll lançar NotFoundException', async () => {
      const query: PaginationLinkRequest = { page: 1, limit: 10 };
      jest.spyOn(service, 'findAll').mockRejectedValue(new NotFoundException('Links not found'));
      await expect(controller.findAll(query)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('encontrar um', () => {
    it('deve chamar linkService.findOne com o id fornecido', async () => {
      const id = '123';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('deve lançar NotFoundException se linkService.findOne lançar NotFoundException', async () => {
      const id = '123';
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.findOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('atualizar', () => {
    it('deve chamar linkService.update com o id e o UpdateLinkDto fornecidos', async () => {
      const id = '123';
      const updateLinkDto: UpdateLinkDto = { originalURL: 'https://updated.com' };
      await controller.update(id, updateLinkDto);
      expect(service.update).toHaveBeenCalledWith(id, updateLinkDto);
    });

    it('deve lançar NotFoundException se linkService.update lançar NotFoundException', async () => {
      const id = '123';
      const updateLinkDto: UpdateLinkDto = { originalURL: 'https://updated.com' };
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.update(id, updateLinkDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remover', () => {
    it('deve chamar linkService.remove com o id fornecido', async () => {
      const id = '123';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('deve lançar NotFoundException se linkService.remove lançar NotFoundException', async () => {
      const id = '123';
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.remove(id)).rejects.toThrowError(NotFoundException);
    });
  });
});

