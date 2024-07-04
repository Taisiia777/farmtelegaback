import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Referral } from '../referral/referral.entity';
import { Reward } from '../reward/reward.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: 0 })
  coins: number;

  @Column({ default: 1 })
  incomeMultiplier: number;

  @Column({ default: 0 })
  coinsPerHour: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => Referral, (referral) => referral.referer)
  referrals: Referral[];

  @OneToMany(() => Reward, reward => reward.user)
  rewards: Reward[];
}
