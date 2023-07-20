import express from "express";

import AuthenticationController from "../../controllers/v1/authentication.controller";
import AuthenticationPayload from "../../payloads/v1/authentication.payload";

const route = express.Router();

route.post("/", [AuthenticationPayload.login, AuthenticationController.login]);
route.post("/otp", [
	AuthenticationPayload.loginOTP,
	AuthenticationController.loginOTP,
]);

export default route;
