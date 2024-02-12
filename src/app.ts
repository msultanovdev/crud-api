import { IncomingMessage, ServerResponse } from "http";
import {
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getAllUsers,
} from "./controllers/userController";

const app = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  if (url === "/api/users") {
    if (req.method === "GET") {
      getAllUsers(req, res);
    } else if (req.method === "POST") {
      createUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  } else if (url?.startsWith("/api/users/")) {
    if (req.method === "GET") {
      getUserById(req, res);
    } else if (req.method === "PUT") {
      updateUser(req, res);
    } else if (req.method === "DELETE") {
      deleteUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
};

export default app;
