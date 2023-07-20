import supertest from "supertest";

import ExpressApplication from "../../bin/www";

beforeAll(function () {
	ExpressApplication.bodyParser();
	ExpressApplication.cookieParser();
	ExpressApplication.rateLimiter();
	ExpressApplication.middlewaresInjector();
	ExpressApplication.routesInjector();
	ExpressApplication.startExpressApplication();
});

describe("package test", function () {
	test('get details of "react" package', async function () {
		const application = supertest(ExpressApplication.getExpressApplication());

		const request = await application.get("/v1/package/react");

		expect(request.body.success).toEqual(true);
		expect(request.body.data).not.toEqual({});
	});
	test('get details of "react" package with specific version', async function () {
		const application = supertest(ExpressApplication.getExpressApplication());

		const request = await application.get("/v1/package/react/0.2.2");

		expect(request.body.success).toEqual(true);
		expect(request.body.data).not.toEqual({});
	});
	test("get details of no exist package", async function () {
		const application = supertest(ExpressApplication.getExpressApplication());

		const request = await application.get("/v1/package/noexistpackage");

		expect(request.body.success).toEqual(false);
		expect(request.body.message).toEqual("package not found");
	});
	test("get details of no exist package with specific version", async function () {
		const application = supertest(ExpressApplication.getExpressApplication());

		const request = await application.get("/v1/package/noexistpackage/1.0.0");

		expect(request.body.success).toEqual(false);
		expect(request.body.message).toEqual("package or version not found");
	});
});
