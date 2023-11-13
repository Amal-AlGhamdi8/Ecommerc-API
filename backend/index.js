import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

import { dev } from "./config/config.js";
import productsRoute from "./routes/productsRoute.js";


const app = express();
const port = dev.app.port || 8080 || 5000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
  message: "You have reached maximum request , please try after a minute"
});

// Apply the rate limiting middleware to all requests.
// app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use("/products",productsRoute);


app.get("/", limiter,  (req, res) => {
  res.send("<h1>Hello World</h1>");
});


// client error -> if not found http://localhost:8080/products
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// server error -> read a file  , get a product
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});
