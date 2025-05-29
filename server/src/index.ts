import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectdb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import menuRoute from "./routes/menu.routes";
import orderRoute from "./routes/order.route";
import path from "path";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;


const clientDistPath = path.join(process.cwd(), "client", "dist");

app.use(
  cors({
    origin: "http://localhost:5174", 
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);


app.use(express.static(clientDistPath));


app.use("*", (_, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
