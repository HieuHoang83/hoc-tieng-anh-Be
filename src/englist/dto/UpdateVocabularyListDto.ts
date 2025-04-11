import { IsString, IsOptional, Length, IsBoolean } from 'class-validator';

export class UpdateVocabularyListDto {
  @IsOptional()
  @IsString()
  @Length(1, 100) // Giới hạn độ dài tên danh sách
  name?: string; // Có thể cập nhật tên, không bắt buộc

  @IsOptional()
  @IsBoolean()
  important?: boolean;
}
