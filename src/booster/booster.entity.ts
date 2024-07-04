import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  yieldIncrease: number;

  @Column()
  available: boolean;
}
