import express from "express";
import body_parser from "body-parser";
import cookie_parser from "cookie-parser";
import rateLimit from "express-rate-limit";
import toobusy from "toobusy-js";
import hpp from "hpp";

import log from "../libraries/winston.library";

import v1 from "../versions/v1";

const application = express();
const port: any = process.env.PORT;

export default class ExpressApplication {
	static bodyParser(): void {
		application.use(
			body_parser.urlencoded({
				extended: false,
			})
		);
		application.use(
			body_parser.json({
				limit: "100kb",
			})
		);
		return;
	}

	static cookieParser(): void {
		application.use(cookie_parser());
		return;
	}

	static HTTPParamterPollution(): void {
		application.use(hpp());
		return;
	}

	static tooBusy(): void {
		application.use(function (
			request: express.Request,
			response: express.Response,
			next: express.NextFunction
		) {
			if (toobusy()) {
				return response
					.status(503)
					.json({ success: false, message: "server too busy" });
			} else {
				next();
			}
		});
		return;
	}

	static rateLimiter(): void {
		application.use(
			rateLimit({
				windowMs: 15 * 60 * 1000,
				max: 800,
				standardHeaders: true,
				legacyHeaders: false,
				message: {
					status: 429,
					success: false,
					message: "to many requests",
				},
			})
		);
		return;
	}

	static middlewaresInjector() {
		// custom middlwares
	}

	static routesInjector(): void {
		application.use("/v1", v1)
		return;
	}

	static startExpressApplication(): void {
		application.listen(port, "0.0.0.0", function () {
			log.info(`application started successfully on port ${port}`);
		});
		return;
	}

	static getExpressApplication(): express.Application {
		return application;
	}
}
