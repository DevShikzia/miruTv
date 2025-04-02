import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user?: User
}

interface User {
    userid: string;
    username: string;
    iat: number;
    exp: number;
}