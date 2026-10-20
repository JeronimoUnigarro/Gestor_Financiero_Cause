import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength, Matches } from 'class-validator';
export class RegisterDto { @IsEmail() email!: string; @MinLength(8) @MaxLength(100) password!: string; @IsOptional() @IsString() @MaxLength(120) name?: string; }
export class LoginDto { @IsEmail() email!: string; @IsString() @MinLength(1) password!: string; }
export class ProfileDto { @IsString() @MaxLength(120) name!: string; @IsOptional() @IsString() @MaxLength(30) phone?: string; @IsOptional() @IsString() @MaxLength(100) city?: string; @IsOptional() @IsString() @MaxLength(900000) avatarData?: string|null; }
export class ChangePasswordDto { @IsString() @MinLength(1) @MaxLength(100) currentPassword!: string; @IsString() @MinLength(8) @MaxLength(100) newPassword!: string; }
export class CategoryDto { @IsString() @MinLength(1) @MaxLength(80) name!: string; @IsIn(['INCOME','EXPENSE']) type!: string; }
export class CategoryUpdateDto { @IsString() @MinLength(1) @MaxLength(80) name!: string; }
export class MovementDto { @Matches(/^\d+(\.\d{1,2})?$/) amount!: string; @IsString() categoryId!: string; @Matches(/^\d{4}-\d{2}-\d{2}$/) date!: string; @IsOptional() @IsString() @MaxLength(255) description?: string; }
export class BudgetDto { @Matches(/^\d+(\.\d{1,2})?$/) limitAmount!: string; @IsString() categoryId!: string; @Matches(/^\d{4}-\d{2}-\d{2}$/) startDate!: string; @Matches(/^\d{4}-\d{2}-\d{2}$/) endDate!: string; }
export class GoalDto { @IsString() @MinLength(1) @MaxLength(120) name!: string; @Matches(/^\d+(\.\d{1,2})?$/) targetAmount!: string; @Matches(/^\d{4}-\d{2}-\d{2}$/) targetDate!: string; }
export class ContributionDto { @Matches(/^\d+(\.\d{1,2})?$/) amount!: string; }
