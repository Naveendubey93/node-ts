import { User } from '../models/User';

class UserService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: User): User {
    const newUser: User = {
      ...user,
      id: Date.now().toString(), // Generate a unique ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  public updateUser(id: string, updatedUser: User): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      const updated = { ...this.users[index], ...updatedUser };
      this.users[index] = updated;
      return updated;
    }
    return undefined;
  }

  updateUserS2(id: string, updatedUser: User): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedUserObj: User = {
        ...this.users[userIndex],
        ...updatedUser,
        updatedAt: new Date(),
      };

      this.users[userIndex] = updatedUserObj;

      return updatedUserObj;
    }

    return undefined;
  }

  public deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
  
  deleteUserS2(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length !== initialLength;
  }

  private getNextId(): Number {
    const maxId = Math.max(...this.users.map(user => Number(user.id)));
    return maxId + 1;
  }
}

const userService = new UserService();
export default userService;
