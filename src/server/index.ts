import express, { Request, Response, NextFunction } from "express"
import http_errors from "http-errors"

/* Local Imports */
import * as routes from "./routes"

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", routes.root);
app.use("testing", () => { });

app.use((_req: Request, _response: Response, next: NextFunction) => {
  next(http_errors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
