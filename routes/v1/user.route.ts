import express from "express";

import UserController from "../../controllers/v1/user.controller";

const route = express.Router();

route.get("/", [UserController.read]);

export default route;
