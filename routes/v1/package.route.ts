import express from "express";

import PackageController from "../../controllers/v1/package.controller";
import PackagePayload from "../../payloads/v1/package.payload";

const route = express.Router();

route.get("/search", [PackagePayload.search, PackageController.search]);

route.get("/:package", [PackageController.read]);
route.get("/:package/:version", [PackageController.readVersion]);

export default route;
