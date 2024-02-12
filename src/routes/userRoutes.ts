import { IncomingMessage, ServerResponse } from "http";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

export const routes: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  "/api/users": (req, res) => {
    if (req.method === "GET") {
      getAllUsers(req, res);
    } else if (req.method === "POST") {
      createUser(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  },
  "/api/users/": (req, res) => {
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
  },
};
