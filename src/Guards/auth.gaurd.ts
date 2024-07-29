import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken"
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, "setnest"); // need to replace the secret with some hash
      request.user = decoded;

      return true;
    }
    return false;

  }
}