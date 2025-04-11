import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVocabularyListDto } from './dto/CreateVocabularyListDto';
import { UpdateVocabularyListDto } from './dto/UpdateVocabularyListDto';
import { CreateVocabularyDto } from './dto/CreateVocabularyDto';
import { UpdateVocabularyDto } from './dto/UpdateVocabularyDto';
import { AddMultipleVocabulariesDto } from './dto/AddMultipleVocabulariesDto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prisma: PrismaService) {}
  async findWordsByListId(listId: string) {
    // Kiểm tra danh sách có tồn tại không trước khi lấy từ vựng
    await this.findListById(listId);

    return this.prisma.vocabulary.findMany({
      where: { listId },
      orderBy: { createdAt: 'desc' },
    });
  }
  /** 📌 Tạo danh sách từ vựng */
  async createList(data: CreateVocabularyListDto) {
    return this.prisma.vocabularyList.create({
      data: {
        name: data.name,
        important: data.important || false, // Nếu không có giá trị thì mặc định là false
      },
    });
  }

  /** 📌 Lấy tất cả danh sách từ vựng */
  async findAllLists() {
    return this.prisma.vocabularyList.findMany({
      include: {
        words: true, // Bao gồm tất cả các từ vựng liên quan
      },
      orderBy: [
        { important: 'desc' }, // Đảm bảo rằng 'important' = true xuất hiện trước 'important' = false
        { createdAt: 'desc' }, // Sau đó sắp xếp theo thời gian tạo giảm dần
      ],
    });
  }

  /** 📌 Lấy danh sách từ vựng theo ID */
  async findListById(id: string) {
    const list = await this.prisma.vocabularyList.findUnique({
      where: { id },
      include: { words: true },
    });

    if (!list) throw new NotFoundException(`Danh sách từ vựng không tồn tại.`);
    return list;
  }

  /** 📌 Cập nhật danh sách từ vựng */
  async updateList(id: string, data: UpdateVocabularyListDto) {
    // Kiểm tra danh sách có tồn tại không
    await this.findListById(id);
    await this.prisma.vocabularyList.update({
      where: { id },
      data,
    });
    return this.findAllLists();
  }

  /** 📌 Xóa danh sách từ vựng */
  async removeList(id: string) {
    // Kiểm tra danh sách có tồn tại không
    await this.findListById(id);
    return this.prisma.vocabularyList.delete({ where: { id } });
  }

  /** 📌 Thêm từ vựng vào danh sách */
  async createWord(data: CreateVocabularyDto) {
    // Kiểm tra xem danh sách từ vựng có tồn tại không trước khi thêm từ mới
    await this.findListById(data.listId);

    return this.prisma.vocabulary.create({
      data: {
        word: data.word,
        meaning: data.meaning,
        note: data.note,
        img: data.img,
        reading: data.reading,
        example: data.example,
        listId: data.listId,
      },
    });
  }
  async addMultiple(dto: AddMultipleVocabulariesDto) {
    const { listId, words } = dto;

    // Kiểm tra danh sách có tồn tại không
    const list = await this.prisma.vocabularyList.findUnique({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException('Vocabulary list not found');
    }

    // Thêm nhiều từ vựng cùng lúc
    await this.prisma.vocabulary.createMany({
      data: words.map((word) => ({
        word: word.word,
        meaning: word.meaning,
        note: word.note,
        listId: listId,
      })),
    });

    return this.findWordsByListId(listId);
  }
  /** 📌 Lấy tất cả từ vựng */
  async findAllWords() {
    return this.prisma.vocabulary.findMany({
      include: { list: true },
    });
  }

  /** 📌 Lấy từ vựng theo ID */
  async findWordById(id: string) {
    const word = await this.prisma.vocabulary.findUnique({
      where: { id },
      include: { list: true },
    });

    if (!word) throw new NotFoundException(`Từ vựng không tồn tại.`);
    return word;
  }

  /** 📌 Cập nhật từ vựng */
  async updateWord(id: string, data: UpdateVocabularyDto) {
    // Kiểm tra từ vựng có tồn tại không
    await this.findWordById(id);

    return this.prisma.vocabulary.update({
      where: { id },
      data,
    });
  }

  /** 📌 Xóa từ vựng */
  async removeWord(id: string) {
    // Kiểm tra từ vựng có tồn tại không
    await this.findWordById(id);

    return this.prisma.vocabulary.delete({ where: { id } });
  }
}
