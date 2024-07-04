import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  type: string;  // 'coin', 'booster', 'skin', etc.

  @Column()
  amount: number;

  @ManyToOne(() => User, user => user.rewards)
  user: User;

  @ManyToOne(() => User)
  referer: User;

  @Column({ nullable: true })
  level?: number;

  @Column({ nullable: true })
  coins?: number;
}
