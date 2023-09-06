import express from "express";
import userRoutes from "./routes/userRoutes";
import userProfileRoutes from "./routes/userProfileRoutes";
import platformNameRoutes from "./routes/platformNameRoutes";
const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.use("/", userProfileRoutes);
app.use("/", platformNameRoutes);
export default app;
