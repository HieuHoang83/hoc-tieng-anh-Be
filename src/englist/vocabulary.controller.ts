import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';
import { CreateVocabularyListDto } from './dto/CreateVocabularyListDto';
import { VocabularyService } from './vocabulary.service';
import { UpdateVocabularyListDto } from './dto/UpdateVocabularyListDto';
import { CreateVocabularyDto } from './dto/CreateVocabularyDto';
import { UpdateVocabularyDto } from './dto/UpdateVocabularyDto';
import { AddMultipleVocabulariesDto } from './dto/AddMultipleVocabulariesDto';

@Controller('vocabulary')
@UseGuards(JwtAuthGuard)
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  /** 📌 Tạo danh sách từ vựng */
  @Public()
  @Get('list/:listId')
  async getWordsByListId(@Param('listId') listId: string) {
    return this.vocabularyService.findWordsByListId(listId);
  }
  @Public()
  @Post('list')
  createList(@Body() dto: CreateVocabularyListDto) {
    return this.vocabularyService.createList(dto);
  }

  /** 📌 Lấy tất cả danh sách từ vựng */
  @Public()
  @Get('list')
  findAllLists() {
    return this.vocabularyService.findAllLists();
  }
  @Public()
  @Post('add-multiple')
  async addMultipleVocabularies(@Body() dto: AddMultipleVocabulariesDto) {
    return this.vocabularyService.addMultiple(dto);
  }
  /** 📌 Lấy danh sách từ vựng theo ID */
  @Public()
  @Get('list/:id')
  findListById(@Param('id') id: string) {
    return this.vocabularyService.findListById(id);
  }

  /** 📌 Cập nhật danh sách từ vựng */
  @Public()
  @Patch('list/:id')
  updateList(@Param('id') id: string, @Body() dto: UpdateVocabularyListDto) {
    return this.vocabularyService.updateList(id, dto);
  }

  /** 📌 Xóa danh sách từ vựng */
  @Public()
  @Delete('list/:id')
  removeList(@Param('id') id: string) {
    return this.vocabularyService.removeList(id);
  }

  /** 📌 Thêm từ vựng vào danh sách */
  @Public()
  @Post()
  createWord(@Body() dto: CreateVocabularyDto) {
    return this.vocabularyService.createWord(dto);
  }

  /** 📌 Lấy tất cả từ vựng */
  @Public()
  @Get()
  findAllWords() {
    return this.vocabularyService.findAllWords();
  }

  /** 📌 Lấy từ vựng theo ID */
  @Public()
  @Get(':id')
  findWordById(@Param('id') id: string) {
    return this.vocabularyService.findWordById(id);
  }

  /** 📌 Cập nhật từ vựng */
  @Public()
  @Patch(':id')
  updateWord(@Param('id') id: string, @Body() dto: UpdateVocabularyDto) {
    return this.vocabularyService.updateWord(id, dto);
  }

  /** 📌 Xóa từ vựng */
  @Public()
  @Delete(':id')
  removeWord(@Param('id') id: string) {
    return this.vocabularyService.removeWord(id);
  }
}
