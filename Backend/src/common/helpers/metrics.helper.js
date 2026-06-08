import client from "prom-client";

// Khởi tạo các metrics mặc định (CPU, RAM, Event Loop lag, ...)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Khởi tạo custom metrics (ví dụ đếm số lượng HTTP requests)
export const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"],
});

export const metricsEndpoint = async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
};
