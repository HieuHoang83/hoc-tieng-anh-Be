import { IsString, IsOptional, IsUUID, Length } from 'class-validator';

export class CreateVocabularyDto {
  @IsString()
  @Length(1, 250) // Giới hạn độ dài từ 1 đến 100 ký tự
  word: string;

  @IsString()
  @Length(1, 255) // Giới hạn độ dài tối đa 255 ký tự
  meaning: string;

  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  reading?: string;

  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  note?: string;
  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  example?: string;

  @IsOptional() // Trường này không bắt buộc
  @IsString()
  img?: string;

  @IsUUID() // Kiểm tra xem có phải UUID hợp lệ không
  listId: string;
}
