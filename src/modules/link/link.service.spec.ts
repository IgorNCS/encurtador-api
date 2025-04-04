import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

describe('LinkService', () => {
    let service: LinkService;
    let repository: Repository<Link>;
    let userService: UserService;

    const mockRepository = {
        findOne: jest.fn(),
        save: jest.fn(),
        findAndCount: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LinkService,
                {
                    provide: getRepositoryToken(Link),
                    useValue: mockRepository,
                },
                {
                    provide: UserService,
                    useValue: {
                        get: jest.fn().mockResolvedValue({ sid: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4g' }),
                        getOrNull: jest.fn().mockReturnValue({ sid: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4g' }),
                    },
                },
            ],
        }).compile();

        service = module.get<LinkService>(LinkService);
        repository = module.get<Repository<Link>>(getRepositoryToken(Link));
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should return success when creating a link', async () => {
            const createLinkDto = { url: 'http://www.example.com' };
            const user = await userService.getOrNull();
            const savedLink = {
                id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f',
                originalURL: createLinkDto.url,
                encurtadaURL: 'A1b2C3',
                clicks: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: user.sub,
            };

            jest.spyOn(repository, 'save').mockResolvedValue(savedLink as Link);

            const result = await service.create(createLinkDto);

            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(savedLink);
        });
    });

    describe('findAll', () => {
        it('should return links when user is logged in', async () => {
            const findAllQuery = {
                limit: 10,
                offset: 0,
            };
            const user = userService.get();
            const links = [
                {
                    id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f',
                    originalURL: 'http://www.example.com',
                    encurtadaURL: 'A1b2C3',
                    clicks: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: user.sub,
                },
                {
                    id: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4g',
                    originalURL: 'http://www.example2.com',
                    encurtadaURL: 'A1b2C4',
                    clicks: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: user.sub,
                },
            ];

            jest.spyOn(repository, 'findAndCount').mockResolvedValue([links, links.length] as [Link[], number]);

            const result = await service.findAll(findAllQuery);

            expect(repository.findAndCount).toHaveBeenCalledWith({
                where: { userId: user.sub },
                order: { createdAt: 'DESC' },
                take: findAllQuery.limit,
                skip: findAllQuery.offset,
            });

            expect(result.list).toEqual(links);
        });
    });
});