declare namespace global {
	interface JWTInterface {
		id: string;
	}
}

declare namespace Express {
  interface Request {
    user?: object;
  }
}
