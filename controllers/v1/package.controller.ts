import express, { response } from "express";
import axios from "axios";

export default class PackageController {
	static async search(request: express.Request, response: express.Response) {
		const query = request.query.query as string;

		try {
			const npmRequest = await axios.get(
				"https://registry.npmjs.org/-/v1/search",
				{
					params: {
						text: query,
					},
					validateStatus: () => true,
				}
			);

			if (npmRequest.status !== 200) {
				response.status(404).json({
					success: false,
					message: "package not found",
				});
				return;
			}

			response.status(200).json({
				success: true,
				data: npmRequest.data.objects,
			});
		} catch {
			response.status(500).json({
				success: false,
				message: "internal server error",
			});
			return;
		}
	}

	static async read(request: express.Request, response: express.Response) {
		const name = request.params.package;

		try {
			const npmRequest = await axios.get(
				`https://registry.npmjs.org/${name}`
			);

			if (npmRequest.status !== 200) {
				response.status(404).json({
					success: false,
					message: "package not found",
				});
				return;
			}

			response.status(200).json({
				success: true,
				data: npmRequest.data,
			});
			return;
		} catch {
			response.status(500).json({
				success: false,
				message: "internal server error",
			});
			return;
		}
	}
	static async readVersion(
		request: express.Request,
		response: express.Response
	) {
		const name = request.params.package;
		const version = request.params.version;

		try {
			const packageRequest = await axios.get(
				`https://registry.npmjs.org/${name}/${version}`,
				{ validateStatus: () => true }
			);
			const packageResponse = packageRequest.data;

			if (packageResponse.error) {
				response.status(404).json({
					success: false,
					message: "package not found",
				});
				return;
			}

			response.status(200).json({
				success: true,
				data: packageResponse,
			});
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
