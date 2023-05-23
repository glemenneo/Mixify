import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    displayName: string;

    @IsUrl()
    @IsOptional()
    profilePicUrl: string;

    @IsString()
    @IsOptional()
    bio: string;
}
