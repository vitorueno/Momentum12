export class UserResponseDto {
  id: string;
  email: string;
  name?: string;

  static fromEntity(entity: { id: string; email: string; name?: string }) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
    };
  }
}
