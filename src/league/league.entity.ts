import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  achievement: number;

  @Column()
  reward: number;

  @Column()
  incomeMultiplier: number;
}
