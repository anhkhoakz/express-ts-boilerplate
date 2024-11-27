import express, { Application, Request, Response } from "express";
import http, { Server } from "http";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import { z } from "zod";

const app: Application = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

const server: Server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {string} value - Port number
 * @return {number} - Port number
 */
const normalizePort = (value: string) => {
	const port = z.string().parse(value);
	const parsedPort = parseInt(port, 10);

	if (isNaN(parsedPort) || parsedPort < 0) {
		throw new Error("Invalid port number");
	}
	return parsedPort;
};

const PORT: number = process.env.PORT ? normalizePort(process.env.PORT) : 3000;

/**
 * Start the server
 
 * @param {number} PORT - Port number to listen on

*/
server.listen(PORT, () => {
	console.log("Server is running on http://localhost:3000");
});

/**
 * Close the server gracefully
 *
 * @param {string} signal - Signal to terminate the server
 */

const closeGracefully = async (signal: string) => {
	console.log(`*^!@4=> Received signal to terminate: ${signal}`);

	await new Promise<void>((resolve, reject) => {
		server.close((err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
	process.kill(process.pid, signal);
};
process.once("SIGINT", closeGracefully);
process.once("SIGTERM", closeGracefully);

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/express-ts-boilerplate");

// mongoose.connection.on("error", (err) => {
// 	console.error(err);
// 	process.exit(1);
// });

// mongoose.connection.on("connected", () => {
// 	console.log("MongoDB connected");
// });
