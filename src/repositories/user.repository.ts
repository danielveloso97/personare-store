import { User } from 'src/entities/user.entity';

export interface UserRepository {
  create(): Promise<User>;
}
