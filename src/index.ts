const http = require("http");
import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
