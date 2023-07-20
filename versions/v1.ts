import express from "express";

import authenticationRoute from "../routes/v1/authentication.route";
import userRoute from "../routes/v1/user.route";
import packageRoute from "../routes/v1/package.route";


const route = express.Router();

route.use("/authentication", authenticationRoute);
route.use("/user", userRoute);
route.use("/package", packageRoute);

export default route;