import { NextFunction, Request, Response } from "express";
import { logWarning } from "../../loggers/index";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {  // ✅ Correcto: Sin retorno explícito
  logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`);
  res.status(404).json({ message: "Ups, Ruta inexistente..." });
};
