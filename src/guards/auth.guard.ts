import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return false;
    }

    const user = await this.usersService.getMe(token);
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }
}
