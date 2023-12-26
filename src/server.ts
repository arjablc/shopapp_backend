import express from "express";
import productRouter from "./router/productRouter";
import { errorMiddleWare } from "./middlewares/errorMiddleware";
const app = express();
const port = process.env.PORT;
app.use("/products", productRouter);
console.log(port);

app.use(errorMiddleWare);
app.get("/", (req, res, next) => {
  res.status(200).json({
    data: "this is the json data",
  });
});
app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});
