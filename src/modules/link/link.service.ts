import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { ClsService } from 'nestjs-cls';
import { Link } from './entities/link.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';
import { FindAllLinkResponseDTO } from './dto/response/findall-link.response.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private modelRepository: Repository<Link>,
    private readonly clsService: ClsService,
  ) {}
  create(createLinkDto: CreateLinkDto): Promise<Link> {
    try {
      const link = new Link();
      const user = this.clsService.get('user');
      if (user) link.userId = user.sid;
      link.originalURL = createLinkDto.url;
      link.encurtadaURL = this.generateShortLink();

      const saved = this.modelRepository.save(link);
      return saved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PaginationLinkRequest): Promise<FindAllLinkResponseDTO> {
    try {
      const { initialDate, finalDate, page = 1, limit = 10 } = query;
      const where: any = {};
      const user = this.clsService.get('user');
      if (!user) throw new NotFoundException('Usuário não encontrado');
      where.userId = user.sid;
      if (initialDate && finalDate) {
        where.createdAt = Between(initialDate, finalDate);
      }
      const skip = ((page || 1) - 1) * (limit || 10);

      const findOptions: FindManyOptions<Link> = {
        order: {
          createdAt: 'DESC',
        },
        where: where,
        take: limit,
        skip: skip,
      };

      const [result, total] =
        await this.modelRepository.findAndCount(findOptions);

      return {
        current_page: page,
        total_pages: Math.ceil(total / limit),
        total_per_pages: limit,
        list: result,
        totalItems: total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Link> {
    try {
      const user = this.clsService.get('user');
      const link = await this.modelRepository.findOne({
        where: { id: id, userId: user.sid },
      });
      if (!link) throw new NotFoundException('Link não encontrado');
      return link;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      const user = this.clsService.get('user');
      const link = await this.modelRepository.preload({
        id,
        userId: user.sid,
        ...updateLinkDto,
      });
      if (!link) throw new NotFoundException('Link não encontrado');
      return await this.modelRepository.save(link);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = this.clsService.get('user');
      const link = await this.modelRepository.findOne({
        where: { id: id, userId: user.sid },
      });
      if (!link) throw new NotFoundException('Link não encontrado');
      return await this.modelRepository.softRemove(link);
    } catch (error) {
      throw error;
    }
  }

  async incrementClicks(encurtadaURL: string): Promise<void> {
    try {
      const link = await this.modelRepository.findOne({
        where: { encurtadaURL: encurtadaURL },
      });

      if (!link) throw new NotFoundException('URL encurtada não encontrada para incrementar o número de cliques.');

      link.clicks += 1;

      await this.modelRepository.save(link);
    } catch (error) {
      console.error('Erro ao incrementar o número de cliques:', error);
    }
  }

  async findOneByEncurtadaURL(encurtadaURL: string): Promise<Link> {
    try {
      const link = await this.modelRepository.findOne({
        where: { encurtadaURL: encurtadaURL },
      });
      if (!link) throw new NotFoundException('Link não encontrado');
      return link;
    } catch (error) {
      throw error;
    }
  }
  private generateShortLink(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortLink = '';
    const length = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    for (let i = 0; i < length; i++) {
      shortLink += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return shortLink;
  }
}
