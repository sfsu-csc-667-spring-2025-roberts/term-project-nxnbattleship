/**
 * Project: NxN Battleship
 * Authors: Angelo Arriaga
 *          Rudy Liu
 *
 * Run site with `npm start`
 */

/* Dependency Imports */
import express, { Request, Response, NextFunction } from "express"
import http_errors from "http-errors"
import path from "path"
import * as exp_hbs from "express-handlebars"
import Handlebars = require("handlebars");
import morgan from "morgan";
import cookieParser from "cookie-parser";
/* Dotenv */
import dotenv from "dotenv";
dotenv.config();

/* Local Imports */
import * as routes from "./routes"
import { mware_time } from "./middleware/time";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(morgan("dev"));
app.use(cookieParser());

/* Allows express to parse/handle json
 * by taking in application/json and returning the data in the body */
app.use(express.json());
/* Allows to take in url encoded data, like when a form is submitted */
app.use(express.urlencoded({ extended: false }));

/* Enable Middleware Functions */
app.use(mware_time);

/* Static Directory */
app.use(express.static(path.join(process.cwd(), "public")));

/* Routes */
app.use("/", routes.root);
app.use("/testing", routes.test);

/* Handlebars rendering for pages */
const hbs: exp_hbs.ExpressHandlebars = exp_hbs.create({
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'layout_default',
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
/* Helpers for handlebars layouts */
var helpers = require('handlebars-helpers')();
Handlebars.registerHelper(helpers);


app.use((_req: Request, _response: Response, next: NextFunction) => {
  next(http_errors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
