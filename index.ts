// logger
import log from "./libraries/winston.library";
log.info("starting up the project");

// env
import env from "./libraries/dotenv.library";
env.config();

// web application
import ExpressApplication from "./bin/www";

ExpressApplication.bodyParser();
ExpressApplication.cookieParser();
ExpressApplication.tooBusy();
ExpressApplication.rateLimiter();
ExpressApplication.middlewaresInjector();
ExpressApplication.routesInjector();
ExpressApplication.startExpressApplication();
