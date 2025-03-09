import { ResponseStatusEnum } from '../enum/common.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessage {
  @ApiProperty()
  public status: ResponseStatusEnum;

  @ApiProperty()
  public message: string;
}
