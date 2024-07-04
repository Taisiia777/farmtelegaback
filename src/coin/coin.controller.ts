import { Controller, Post, Param } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Post('buy/:userId/:coinId')
  buyCoin(@Param('userId') userId: number, @Param('coinId') coinId: number) {
    return this.coinService.buyCoin(userId, coinId);
  }
}
