import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email'
  })
  email: string;

  @ApiPropertyOptional({
    description: 'User display name',
    example: 'John Doe'
  })
  name?: string;

  static fromEntity(entity: { id: string; email: string; name?: string }) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
    };
  }
}
