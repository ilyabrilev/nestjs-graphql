import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "../graphql/models/user";
import { UserSetting } from "../graphql/models/user-setting";
import { CreateUserInput } from "../graphql/inputs/create-user-input";
import { UsersService } from "./users.service";
import { Inject } from "@nestjs/common";
import { UserSettingsService } from "./user-settings.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(
        @Inject(UsersService) private usersService: UsersService,
        @Inject(UserSettingsService) private usersSettingService: UserSettingsService
    ){}

    @Query(returns => User, { nullable: true })
    getUserById(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.getUserById(id);
    }

    @Query(() => [User], { nullable: true })
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @ResolveField(() => UserSetting, { name: 'settings', nullable: true })
    getUserSettings(@Parent() user: User) {
        if (user.settings) {
            return user.settings;
        }
        return this.usersSettingService.getUserSettingsById(user.id);
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserInput: CreateUserInput) {
        return this.usersService.createUser(createUserInput);
    }
}