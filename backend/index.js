import express from "express";
import dotenv from "dotenv";
import memberRoutes from "./routes/member.route.js"
import orderRoutes from "./routes/order.route.js"
import adminRoutes from "./routes/admin.route.js";
import ConnectTODB from "./db/db.js";
import cors from "cors";
import path from "path";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/member", memberRoutes)
app.use("/api/order" , orderRoutes)
app.use("/api/admin", adminRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/gasupnow/dist")));

  app.get("*" , (req, res) => {
    res.sendFile(path.join(__dirname , "../frontend/gasupnow", "dist" , "index.html"))
  });
}

app.listen(PORT , () => {
    console.log("Server is listening on PORT:- " , PORT)
    ConnectTODB();
})