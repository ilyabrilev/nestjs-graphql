import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserSettingsInput } from 'src/graphql/inputs/create-user-settings-input';
import { User } from 'src/graphql/models/user';
import { UserSetting } from 'src/graphql/models/user-setting';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService {
    constructor(
        @InjectRepository(UserSetting) private userSettingsRepository: Repository<UserSetting>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    getUserSettingsById(userId: number) {
        return this.userSettingsRepository.findOneBy({ userId });
    }

    async createUserSettings(createUserSettings: CreateUserSettingsInput) {
        const user = await this.userRepository.findOneBy({ id: createUserSettings.userId })
        if (!user) {
            throw new Error('User not found');
        }

        const newSettings = this.userSettingsRepository.create(createUserSettings);
        const savedSettings = await this.userSettingsRepository.save(newSettings);

        user.settings = savedSettings;
        this.userRepository.save(user);
        return savedSettings;
    }
}
