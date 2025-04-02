import { ApiProperty } from '@nestjs/swagger';
import {  Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7f4f' })
    id: string;

    @Column()
    @ApiProperty({ example: 'http://www.example.com' })
    originalURL: string;

    @Column({ unique: true })
    @ApiProperty({ example: 'A1b2C3' })
    encurtadaURL: string;

    @Column({ default: 0 })
    @ApiProperty({ example: 0 })
    clicks: number;

    @Column({nullable: true})
    @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dc364', nullable: true })
    userId: string;

    @CreateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    @ApiProperty({ example: '2023-01-01 00:00:00.000000' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    @ApiProperty({ example: '2023-01-01 00:00:00.000000' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    @ApiProperty({ example: null, nullable: true })
    deleteAt: Date | null;

}

