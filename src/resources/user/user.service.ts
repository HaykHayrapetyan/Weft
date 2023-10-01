import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/input/create-user.input';
import { Model, Types } from "mongoose";
import { Statuses } from './user.types';
import { UserSchema } from './entities/user.entity';
import { MapperManager } from 'src/shared/mapper-manager';
import { UserOutput } from './dto/output/user.output';
import { GetAllusersOutput } from './dto/output/get-all-users.output';
import { UpdateUserStatusOutput } from './dto/output/update-user-status.output';
import { UpdateUserByNameOutput } from './dto/output/update-user-by-name.output';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<typeof UserSchema>) { }

  async createUser(createUserDto: CreateUserInput): Promise<UserOutput> {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return MapperManager.mapToClass(newUser, UserOutput);
  }

  async getAllUsers(skip: number, limit: number): Promise<GetAllusersOutput> {
    const total = await this.userModel.countDocuments({}).exec();
    if (total === 0) {
      throw new NotFoundException('Users data not found!');
    }
    const items =  await this.userModel.find().limit(limit).skip(skip).exec();
    return MapperManager.mapToClass({ total, items }, GetAllusersOutput);
  }

  async getUserByParam(object: {name} | {email}): Promise<UpdateUserByNameOutput> {
    const existingUser = await this.userModel.find(object).exec();
    if (!existingUser.length) {
      throw new NotFoundException(`User not found`);
    }
    return MapperManager.mapToClass(existingUser, UpdateUserByNameOutput);
  }

  async updateUserStatus(userId: Types.ObjectId, status: Statuses): Promise<UpdateUserStatusOutput> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, {status}, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    return MapperManager.mapToClass(existingUser, UpdateUserStatusOutput);
  }
}