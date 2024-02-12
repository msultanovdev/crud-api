import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

export const getAllUsers = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  if (!userId) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Invalid request: userId is missing in the URL",
      }),
    );
    return;
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { username, age, hobbies }: User = JSON.parse(body);

    if (!username || !age) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Username and age are required" }));
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };

    users.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  if (!userId) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Invalid request: userId is missing in the URL",
      }),
    );
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { username, age, hobbies }: User = JSON.parse(body);

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const updatedUser: User = {
      id: userId!,
      //@ts-ignore
      username: username || (users[userIndex] && users[userIndex].username),
      //@ts-ignore
      age: age || (users[userIndex] && users[userIndex].age),
      //@ts-ignore
      hobbies: hobbies || (users[userIndex] && users[userIndex].hobbies) || [],
    };

    users[userIndex] = updatedUser;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  users.splice(userIndex, 1);
  res.writeHead(204);
  res.end();
};
