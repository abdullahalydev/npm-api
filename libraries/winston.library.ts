import path from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

var dailyTransport = new transports.DailyRotateFile({
  filename: path.join(__dirname, "../logs/%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

var consoleTransport = new transports.Console();

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [consoleTransport, dailyTransport],
});

export default logger;
