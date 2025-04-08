import cors from "@fastify/cors";
import fastifyPostgres from "@fastify/postgres";
import dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();

const server = fastify();
server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
});

server.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL,
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
