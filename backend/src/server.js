import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDb from "./config/db.js";
import alertRouter from "./routes/alert.route.js";
import authServer from "./routes/auth.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173/*",
    }),
);
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

app.use("/api/alerts", alertRouter);
app.use("/api/auth", authServer);

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(`MongoDB error: ${err}`);
        process.exit(1);
    }
};

startServer();
