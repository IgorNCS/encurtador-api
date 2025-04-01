import {  Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    originalURL: string;

    @Column({ unique: true })
    encurtadaURL: string;

    @Column({ default: 0 })
    clicks: number;

    @Column({nullable: true})
    userId: string;

    @CreateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleteAt: Date | null;

}

