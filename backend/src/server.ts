import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.config';
import requestRoutes from './routes/request.routes';
import collectionRoutes from './routes/collection.routes';

// Load env
dotenv.config({
  path: process.env.NODE_ENV === "production"
    ? ".env"
    : ".env.development.local"
});

// Connect DB
connectDB();

const app = express();

// ✅ 1. Body parsers
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ extended: true, limit: '40kb' }));

// ✅ 2. CORS (keep simple for now)
app.use(cors({
  origin: process.env.CORS_ORIGIN,
//   credentials: true
}));

// app.use(cors({
//     origin: true,
//     credentials: true
//   }));


// 🔍 Optional debug logger (remove later)
app.use((req, res, next) => {
  console.log(`REQ: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
    console.log("---- REQUEST ----");
    console.log("METHOD:", req.method);
    console.log("URL:", req.url);
    console.log("HEADERS:", req.headers);
    next();
  });

// ✅ 3. Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/requests", requestRoutes);
app.use("/api/collections", collectionRoutes);

// ✅ 4. 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ 5. Global error handler (ALWAYS LAST)
app.use((
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error("ERROR:", err.stack);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});