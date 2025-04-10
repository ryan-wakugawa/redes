import 'reflect-metadata'
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastify from "fastify";
import dbConnection from "typeorm-fastify-plugin";

dotenv.config();

const server = fastify();
server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
});

server.register(dbConnection, {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  synchronize: true,
});

server.post("/", async (request, reply) => {
  const { name } = request.body as { name: string };
  const { email } = request.body as { email: string };
  console.log(`Name: ${name}, Email: ${email}`);
  return { message: "User created successfully" };
});

server.get("/", async (request, reply) => {
  return { hello: "WORLD" };
});

server.patch("/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name } = request.body as { name: string };
  const { email } = request.body as { email: string };
  console.log(`Updating user with ID: ${id}, Name: ${name}, Email: ${email}`);
  return { message: `User with ID: ${id} updated successfully` };
});

server.delete("/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  console.log(`Deleting user with ID: ${id}`);
  return { message: `User with ID: ${id} deleted successfully` };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
