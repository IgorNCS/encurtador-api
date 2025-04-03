import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';
import { LinkResponseDTO } from './dto/response/link.response.dto';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';

describe('Link Controller', () => {
  let controller: LinkController;
  let service: LinkService;

  const mockLinkService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  const mockUserService = () => ({
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
        {
          provide: UserService,
          useFactory: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Link', () => {
    it('Should be call linkService.create with CreateLinkDTO', async () => {
      const createLinkDto: CreateLinkDto = { url: 'http://example.com' };
      await controller.create(createLinkDto);
      expect(service.create).toHaveBeenCalledWith(createLinkDto);
    });

    it('should throw NotFoundException if linkService.create throws NotFoundException', async () => {
      const createLinkDto: CreateLinkDto = { url: 'http://example.com' };
      jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.create(createLinkDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Find All Links', () => {
    it('should call linkService.findAll with a query', async () => {
      const query: PaginationLinkRequest = { page: 1, limit: 10 };
      const expectedResult: LinkResponseDTO = {
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

    it('should throw NotFoundException if linkService.findAll throw NotFoundException', async () => {
      const query: PaginationLinkRequest = { page: 1, limit: 10 };
      jest.spyOn(service, 'findAll').mockRejectedValue(new NotFoundException('Links not found'));
      await expect(controller.findAll(query)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Find One Link', () => {
    it('should call linkService.findOne with the ID', async () => {
      const id = '123';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('Should throw NotFoundException if linkService.findOne thow NotFoundException', async () => {
      const id = '123';
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.findOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Update Link', () => {
    it('should call linkService.update with the id and the UpdateLinkDto', async () => {
      const id = '123';
      const updateLinkDto: UpdateLinkDto = { originalURL: 'https://updated.com' };
      await controller.update(id, updateLinkDto);
      expect(service.update).toHaveBeenCalledWith(id, updateLinkDto);
    });

    it('should throw NotFoundException if linkService.update throw NotFoundException', async () => {
      const id = '123';
      const updateLinkDto: UpdateLinkDto = { originalURL: 'https://updated.com' };
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.update(id, updateLinkDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Remove Link', () => {
    it('should call linkService.remove with the provided id', async () => {
      const id = '123';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if linkService.remove throws NotFoundException', async () => {
      const id = '123';
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Link not found'));
      await expect(controller.remove(id)).rejects.toThrowError(NotFoundException);
    });
  });
});

