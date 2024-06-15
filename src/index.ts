// src/index.ts
import express from "express";
import cors from "cors";
import homeRoute from "./router/home_route";
import rankRoute from "./router/rank_route";

const app = express();
const port = 3000;
app.use(cors());

app.use("/api/home", homeRoute);
app.use("/api/rank", rankRoute);

// 服务器绑定到 0.0.0.0
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
