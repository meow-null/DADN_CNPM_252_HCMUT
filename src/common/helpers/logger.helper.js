import winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";

const esTransportOpts = {
    level: "info",
    clientOpts: { node: process.env.ELASTICSEARCH_URL || "http://localhost:9200" },
    indexPrefix: "log-express",
};

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new ElasticsearchTransport(esTransportOpts)
    ],
});
