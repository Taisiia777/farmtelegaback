export class CreateEventDto {
    readonly name: string;
    readonly description: string;
    readonly type: string;
    readonly startDate: Date;
    readonly endDate: Date;
  }
  