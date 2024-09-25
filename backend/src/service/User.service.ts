export interface UserServiceInterface {
  getUserInfo(userId: number): Promise<any>;
}
