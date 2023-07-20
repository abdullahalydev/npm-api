import dotenv from "dotenv";

export default class Env {
  static config(): void {
    dotenv.config();
		return;
  }
}
