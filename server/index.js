"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const postgres_1 = __importDefault(require("@fastify/postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
});
server.register(postgres_1.default, {
    connectionString: process.env.DATABASE_URL,
});
server.post("/", async (request, reply) => {
    const { name } = request.body;
    const { email } = request.body;
    console.log(`Name: ${name}, Email: ${email}`);
    return { message: "User created successfully" };
});
server.get("/", async (request, reply) => {
    return { hello: process.env.DATABASE_URL };
});
server.patch("/:id", async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    const { email } = request.body;
    console.log(`Updating user with ID: ${id}, Name: ${name}, Email: ${email}`);
    return { message: `User with ID: ${id} updated successfully` };
});
server.delete("/:id", async (request, reply) => {
    const { id } = request.params;
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
