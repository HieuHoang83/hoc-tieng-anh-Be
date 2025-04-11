import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateVocabularyListDto {
  @IsString()
  name: string;

  @IsOptional() // Trường này là không bắt buộc
  @IsBoolean()
  important?: boolean;
}
