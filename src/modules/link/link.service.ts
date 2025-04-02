import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/request/create-link.dto';
import { UpdateLinkDto } from './dto/request/update-link.dto';
import { Link } from './entities/link.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationLinkRequest } from './dto/request/findall-link.dto';
import { LinkResponseDTO } from './dto/response/link.response.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private modelRepository: Repository<Link>,
    private readonly userService:UserService
  ) {}
  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    try {
      const link = new Link();
      const user = this.userService.getOrNull();
      if(user) link.userId = user.sid


      link.originalURL = createLinkDto.url;
      link.encurtadaURL = this.createEncurtadaURL();

      const saved = await this.modelRepository.save(link);
      return saved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PaginationLinkRequest): Promise<LinkResponseDTO> {
    try {
      const { initialDate, finalDate, page = 1, limit = 10 } = query;
      const where: any = {};
      const user = this.userService.get();
      where.userId = user.sid;
      if (initialDate && finalDate) {
        where.createdAt = Between(initialDate, finalDate);
      }
      const skip = this.calculateSkip(page, limit);

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
      const link = await this.findLinkByIdAndUser(id)
      return link;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      const link = await this.findLinkByIdAndUser(id);

      Object.keys(updateLinkDto).forEach((key) => {
        link[key] = updateLinkDto[key];
      });

      return await this.modelRepository.save(link);
    } catch (error) {
      throw error;
    }
  }


  async remove(id: string) {
    try {
      const link = await this.findLinkByIdAndUser(id);
      return await this.modelRepository.softRemove(link);
    } catch (error) {
      throw error;
    }
  }

  async incrementClicks(encurtadaURL: string): Promise<void> {
    try {
      const link = await this.findOneByEncurtadaURL(encurtadaURL);
      link.clicks += 1;
      await this.modelRepository.save(link);
    } catch (error) {
      console.error('Erro ao incrementar o número de cliques:', error);
      throw error;
    }
  }

  //melhorar nome das funcoes
  async findOneByEncurtadaURL(encurtadaURL: string): Promise<Link> {
    try {
      const link = await this.modelRepository.findOne({
        where: { encurtadaURL: encurtadaURL },
      });
      if (!link) throw new NotFoundException('Link not found');
      return link;
    } catch (error) {
      throw error;
    }
  }
  private createEncurtadaURL(): string {
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



  private async findLinkByIdAndUser(id: string): Promise<Link> {
    const user = this.userService.get();
    const link = await this.modelRepository.findOne({
        where: { id: id, userId: user.sid },
    });
    if (!link) {
        throw new NotFoundException('Link not found');
    }
    return link;
}

private calculateSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

}

