import express from "express";
import joi from "joi";

export default class PackagePayload {
	static search(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const schema = joi.object({
				query: joi.string().required(),
			});

			const validation = schema.validate(request.query);

			if (validation.error) {
				response.status(400).json({
					success: false,
					message: "query parameter is required",
				});
				return;
			}

			next();
			return;
		} catch {
			response.status(500).json({
				success: false,
				message: "internal server error",
			});
			return;
		}
	}
}
