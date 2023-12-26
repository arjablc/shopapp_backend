import express from "express";
import productRouter from "./router/productRouter";
import { errorMiddleWare } from "./middlewares/errorMiddleware";

const app = express();
// app.use(express.json());
const port = process.env.PORT;
app.use("/products", productRouter);
app.all("*", (req, res) => {
  res.status(400).json({
    message: "bad Request",
  });
});

app.use(errorMiddleWare);
app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});
