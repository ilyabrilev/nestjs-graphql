import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/graphql/inputs/create-user-input';
import { User } from 'src/graphql/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}  
    
    getAllUsers() {
        return this.userRepository.find({ relations: ['settings' ]});
    }

    getUserById(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    createUser(createUserData: CreateUserInput) {
        const newUser = this.userRepository.create(createUserData);
        return this.userRepository.save(newUser);
    }
}
