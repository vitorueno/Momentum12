export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name?: string,
  ) {}

  owns(resourceUserId: string): boolean {
    return this.id === resourceUserId;
  }

  static fromPrisma(user: any): UserEntity {
    return new UserEntity(user.id, user.email, user.name ?? undefined);
  }
}
