import { IsString, IsOptional, IsUUID, Length } from 'class-validator';

export class UpdateVocabularyDto {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  word?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  meaning?: string;
  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  reading?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  note?: string;

  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  example?: string;

  @IsOptional()
  @IsString()
  img?: string;
  @IsOptional()
  @IsUUID()
  listId?: string; // Cho phép cập nhật danh sách chứa từ vựng
}
