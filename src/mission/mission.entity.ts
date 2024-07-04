import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  type: string;  // 'daily' или 'weekly'

  @Column()
  reward: number;
}
