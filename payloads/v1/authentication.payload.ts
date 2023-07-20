import express from "express";
import joi from "joi";

export default class AuthenticationPayload {
	static login(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const schema = joi.object({
				username: joi.string().min(1).required(),
				password: joi.string().min(10).required(),
			});

			const validate = schema.validate(request.body);

			if (validate.error) {
				response.status(400).json({
					success: false,
					message: validate.error.details[0].message,
				});
				return;
			}

			next();
		} catch {
			response.status(500).json({
				success: false,
				message: "internal server error",
			});
			return;
		}
	}

	static loginOTP(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const schema = joi.object({
				username: joi.string().min(1).required(),
				password: joi.string().min(10).required(),
				otp: joi.string().min(8).max(8).required(),
			});

			const validate = schema.validate(request.body);

			if (validate.error) {
				response.status(400).json({
					success: false,
					message: validate.error.details[0].message,
				});
				return;
			}

			next();
		} catch {
			response.status(500).json({
				sucess: false,
				message: "internal server error",
			});
			return;
		}
	}
}
