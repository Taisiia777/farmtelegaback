import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;  // 'double_coins', 'limited_time', etc.

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
