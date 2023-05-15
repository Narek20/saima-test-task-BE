import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IExtendedRequest extends Request {
  decodedToken?: string | JwtPayload;
}