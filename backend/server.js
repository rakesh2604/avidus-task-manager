require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

const normalizeOrigin = (value) => (value || "").trim().replace(/\/$/, "");

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

const isOriginAllowed = (origin) => {
  const normalized = normalizeOrigin(origin);
  if (!normalized) return true;
  if (allowedOrigins.includes(normalized)) return true;
  // Vercel production + preview deployments
  if (/^https:\/\/[\w.-]+\.vercel\.app$/i.test(normalized)) return true;
  return false;
};

app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        // Reflect the request origin (never send comma-separated list)
        callback(null, origin || allowedOrigins[0]);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
