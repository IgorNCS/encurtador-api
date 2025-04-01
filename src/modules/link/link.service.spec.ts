import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from '../link/entities/link.entity';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';

describe('LinkService', () => {
  let service: LinkService;
  let repository: Repository<Link>;
  let clsService: ClsService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getRepositoryToken(Link),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(), 
          },
        },
        {
          provide: ClsService, 
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
    repository = module.get<Repository<Link>>(getRepositoryToken(Link));
    clsService = module.get<ClsService>(ClsService); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar sucesso ao criar um link', async () => {
      const createLinkDto = { url: 'http://www.example.com' };
      const userId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dc364'; 
      const savedLink = {
        id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f',
        originalURL: createLinkDto.url,
        encurtadaURL: 'A1b2C3',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(savedLink as Link);

      const result = await service.create(createLinkDto); 

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(savedLink);
    });
  });

  describe('findAll', () => {
    it('deve retornar links quando o usuário está logado', async () => {
      const findAllQuery = {
        limit: 10,
        offset: 0,
      };
      const user = { sid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dc364' };
      const links = [
        {
          id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f',
          originalURL: 'http://www.example.com',
          encurtadaURL: 'A1b2C3',
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.sid,
        },
        {
          id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4g',
          originalURL: 'http://www.example2.com',
          encurtadaURL: 'A1b2C4',
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.sid,
        },
      ];

      jest.spyOn(clsService, 'get').mockReturnValue(user); 
      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([links, links.length] as [Link[], number]);

      const result = await service.findAll(findAllQuery);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { userId: user.sid },
        order: { createdAt: 'DESC' },
        take: findAllQuery.limit,
        skip: findAllQuery.offset,
      });

      expect(result.list).toEqual(links);
    });

    it('deve lançar um erro quando o usuário não está logado', async () => {
      jest.spyOn(clsService, 'get').mockReturnValue(null);

      await expect(service.findAll({})).rejects.toThrowError('Usuário não encontrado');
    });
  });
});