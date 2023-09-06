import dotenv from "dotenv";

dotenv.config();
import app from "./app";
const PORT = process.env.PORT || 8081;

async function runServer() {
  app.listen(PORT, () => {
    console.log("server is running:" + PORT);
  });
}

runServer();
