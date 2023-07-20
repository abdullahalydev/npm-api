import axios from "axios";
import express from "express";

export default class UserController {
	static async read(request: express.Request, response: express.Response) {
		const authorization = request.headers.authorization as string;

		try {
			const npmRequest = await axios.get(
				"https://registry.npmjs.org/-/npm/v1/user",
				{
					headers: {
						Authorization: authorization,
					},
					validateStatus: () => true,
				}
			);

			if (npmRequest.status !== 200) {
				response.status(401).json({
					success: false,
					message: "authorization failed",
				});
				return;
			}

			response.status(200).json({
				success: true,
				data: npmRequest.data,
			});
			return;
		} catch {}
	}
}
