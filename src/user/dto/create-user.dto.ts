export class CreateUserDto {
    readonly username: string;
    readonly coins?: number;
    readonly incomeMultiplier?: number;
    readonly coinsPerHour?: number;
    xp?: number;
    level?: number;
  }
  