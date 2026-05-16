import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    async create(email: string, password: string) {
        const user = this.repo.create({ email, password })
        return await this.repo.save(user)
    }
    async findOne(id: number) {

        return await this.repo.findOneBy({ id: id })
    }
    async findAll() {
        return await this.repo.find()
    }
    async update(id: number, newUserProps: Partial<User>) {
        let user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        Object.assign(user, newUserProps)
        return await this.repo.save(user)
    }
    async delete(id: number) {
        let user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        await this.repo.remove(user)

    }
}
