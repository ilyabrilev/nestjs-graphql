import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserSetting } from "../graphql/models/user-setting";
import { CreateUserSettingsInput } from "../graphql/inputs/create-user-settings-input";
import { Inject } from "@nestjs/common";
import { UserSettingsService } from "src/users/user-settings.service";

@Resolver()
export class UserSettingsResolver {
    constructor(@Inject(UserSettingsService) private userSettingsService: UserSettingsService) {}

    @Mutation(() => UserSetting)
    createUserSettings(@Args('input') input: CreateUserSettingsInput) {
        return this.userSettingsService.createUserSettings(input);
    }
}