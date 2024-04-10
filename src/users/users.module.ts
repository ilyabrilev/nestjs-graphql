import { Module } from '@nestjs/common';
import { UsersResolver } from './users-resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/user';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from 'src/graphql/models/user-setting';
import { UserSettingsResolver } from './user-settings-resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSetting])
    ],
    providers: [UsersResolver, UserSettingsResolver, UsersService, UserSettingsService],
})
export class UsersModule {
}
