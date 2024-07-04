import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DailyReward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: number;  // День в последовательности

  @Column()
  amount: number;  // Количество монет
}
