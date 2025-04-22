import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { securityMiddleware } from "./middleware/security";
import { supabase } from "./config/supabase";
import { Context } from "./types";

dotenv.config();

const app = express();

securityMiddleware(app);

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<Context> => {
    const token = req.headers.authorization || "";
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token.replace("Bearer ", ""));
      if (error) throw error;
      return {
        userId: user?.id,
        token: token.replace("Bearer ", ""),
      };
    } catch (error) {
      return {};
    }
  },
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {},
        };
      },
    },
  ],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
