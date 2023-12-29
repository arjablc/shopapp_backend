import express from "express";
import productRouter from "./router/productRouter";
import { errorMiddleWare } from "./middlewares/errorMiddleware";
import { nextTick } from "process";
import BadRequest from "./errors/badRequest";

const app = express();
// app.use(express.json());
const port = process.env.PORT;
app.use("/products", productRouter);
// app.all("*", (req, res, next) => {
//   next(new BadRequest("not a valid path"));
// });

app.use(errorMiddleWare);
app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});
