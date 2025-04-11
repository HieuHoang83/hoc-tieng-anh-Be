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
import { DeviceService } from './device.service';
import { CreateDataDeviceDto } from './dto/create-Datadevice.dto';
import { UpdateDeviceDto } from './dto/update-Datadevice.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Public()
  @Post('/data')
  createDataDevice(@Body() createDataDeviceDto: CreateDataDeviceDto) {
    return this.deviceService.createDataDevice(createDataDeviceDto);
  }
  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto, @User() user: IUser) {
    return this.deviceService.create(createDeviceDto, user);
  }
  @Get()
  findAll() {
    return this.deviceService.findAll();
  }
  @Get('user')
  findByUser(@User() user: IUser) {
    return this.deviceService.findByUser(user.id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
}
