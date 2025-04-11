import {
  IsString,
  IsUUID,
  Length,
  ValidateNested,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class VocabularyDto {
  @IsString()
  word: string;

  @IsString()
  meaning: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsOptional() // Trường này không bắt buộc
  @IsString()
  @Length(0, 255) // Nếu có, tối đa 255 ký tự
  reading?: string;

  @IsString()
  @IsOptional()
  img?: string;
}

export class AddMultipleVocabulariesDto {
  @IsUUID() // Đảm bảo listId là UUID hợp lệ
  listId: string;

  @ArrayNotEmpty() // Đảm bảo danh sách từ không rỗng
  @ValidateNested({ each: true }) // Kiểm tra từng phần tử trong mảng
  @Type(() => VocabularyDto) // Chuyển đổi sang class `VocabularyDto`
  words: VocabularyDto[];
}
