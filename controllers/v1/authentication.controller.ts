import express from "express";
import axios from "axios";

export default class AuthenticationController {
	static async login(request: express.Request, response: express.Response) {
		const username = request.body.username;
		const password = request.body.password;

		try {
			const npmRequest = await axios.put(
				`https://registry.npmjs.org/-/user/org.couchdb.user:${username}`,
				{ name: username, password: password },
				{
					headers: { "Content-Type": "application/json" },
					validateStatus: () => true,
				}
			);

			if (npmRequest.status !== 200) {
				response.status(401).json({
					success: false,
					message: npmRequest.data.error,
				});
				return;
			}

			response.status(201).json({
				success: true,
				message: "authentication successfully",
				data: npmRequest.data.token,
			});
			return;
		} catch {
			response.status(500).json({
				sucess: false,
				message: "internal server error",
			});
			return;
		}
	}

	static async loginOTP(request: express.Request, response: express.Response) {
		const username = request.body.username;
		const password = request.body.password;
		const otp = request.body.otp;

		try {
			const npmRequest = await axios.put(
				`https://registry.npmjs.org/-/user/org.couchdb.user:${username}`,
				{ name: username, password: password },
				{
					headers: { "Content-Type": "application/json", "npm-otp": otp },
					validateStatus: () => true,
				}
			);


			if (npmRequest.status !== 200) {
				response.status(401).json({
					success: false,
					message: npmRequest.data.error,
				});
				return;
			}

			response.status(201).json({
				success: true,
				message: "authentication successfully",
				data: npmRequest.data.token,
			});
			return;
		} catch {
			response.status(500).json({
				success: false,
				message: "internal serve error",
			});
			return;
		}
	}
}
