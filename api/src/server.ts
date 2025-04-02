import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

// Importacion de Router

// Importacion de loggers
import { logInfo } from "./loggers/index";

// Utilidad de limpieza para la carpeta ./temp
import connectDB from "./database/database";
import { StatusError } from "./classes/StatusError";
import notFoundRouter from "./routers/notFound.routes";

//------------------------------------------------------------------------
// server
const app = express();

//------------------------------------------------------------------------
// configuracion server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public/dist/app")));

//--------------------------------------------
// logging general
app.use((req, res, next): void => {
  logInfo(`${req.method} ${req.url}`);
  next();
});

// saludos api
app.get("/api", (req, res): void => {
  res.json({ message: "Bienvenido a la API de MiruTv" });
});
// Router Api
// app.use(router);
//--------------------------------------------
// Router Frontend CLient
// app.use("/", express.static("../public/dist/app"));

// app.use(function (req, res, next) {
//   //Si el formato aceptado no es "html",
//   //significa que la solicitud no está buscando una página HTML y se pasa al siguiente middleware
//   const accept = req.accepts("html", "json", "xml");
//   if (accept !== "html") {
//     return next();
//   }

//   // Si la solicitud acepta el formato "html", se verifica si la ruta de la solicitud tiene una extensión de archivo
//   const ext = path.extname(req.path);
//   if (ext !== "") {
//     return next();
//   }

//   fs.createReadStream(
//     path.join(__dirname, "../public/dist/app/") + "index.html"
//   ).pipe(res);
// });
//--------------------------------------------

// Ruta inexistente
app.use(notFoundRouter);
//--------------------------------------------

// Manejo de errores
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusError = error as StatusError;
    const status = statusError.status ?? 500;
    const description = statusError.message;
     res.status(status).json({ status, description });
     return;
  }
);
//--------------------------------------------

// Conexión a la base de datos MongoDB
connectDB();
//-------------------------------------------

export default app;
