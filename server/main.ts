import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressSession from "express-session";
import http from "http";
import { Server as SocketIO } from "socket.io";
import path from "path";
import { logger } from "./utils/logger";

import Knex from "knex";
import knexConfig from "./knexfile";

export const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", function (socket) {
	console.log(socket);
});

// ----- Need this for form submissions -----
app.use(express.urlencoded({ extended: true }));

// ----- To read json files -----
app.use(express.json());

// ----- For expressSession -----
const sessionMiddleware = expressSession({
	secret: Math.random().toString(32).slice(2),
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
});
declare module "express-session" {
	interface SessionData {
		// To save more items along with cookie
		playerId?: number;
	}
}

app.use(sessionMiddleware);

// For socketIOSession
io.use((socket, next) => {
	let req = socket.request as express.Request;
	let res = req.res as express.Response;
	sessionMiddleware(req, res, next as express.NextFunction);
});

app.use((req, res, next) => {
	logger.debug(`Path: ${req.path},,, Method: ${req.method}`);
	next();
});

import { routes } from "./routes";
import { ApplicationError } from "./utils/error";
app.use(routes);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "private")));

// 404 Not Found
app.use((req, res) => {
	res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.use(
	(
		err: ApplicationError,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		logger.error(err.message);
		res.status(err.httpStatus).json({ message: err.message });
	}
);

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => logger.info(`Listening to PORT [${PORT}]`));
