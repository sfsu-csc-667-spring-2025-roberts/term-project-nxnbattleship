/**
 * Project: NxN Battleship
 * Authors: Angelo Arriaga
 *          Rudy Liu
 *
 * Run site with `npm start`
 */

/* Dependency Imports */
import express, { Request, Response, NextFunction } from "express"
import session from "express-session";
import "../types/session-augmentation";
import connectPgSimple from "connect-pg-simple";
import pgPromise from "pg-promise";
/* Importing pg JUST for sessions, NOTHING ELSE */
import pg from 'pg';
const { Pool } = pg;
/* */
import http_errors from "http-errors"
import * as path from "path"
import * as http from "http"
import * as exp_hbs from "express-handlebars"
import Handlebars = require("handlebars");
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
/* Dotenv */
import dotenv from "dotenv";
dotenv.config();


/* Local Imports */
import * as config      from "./config";
import * as routes      from "./routes";
import * as middleware  from "./middleware";

const app     = express();
const server  = http.createServer(app);
const io      = new Server(server);
const PORT = process.env.PORT || 3000;


app.use(morgan("dev"));
app.use(cookieParser());

/* Allows express to parse/handle json
 * by taking in application/json and returning the data in the body */
app.use(express.json());
/* Allows to take in url encoded data, like when a form is submitted */
app.use(express.urlencoded({ extended: false }));

/* Enable Middleware Functions */
//app.use(mware_time);

/* Enable Sessions */
const pgSession = connectPgSimple(session);

const sessionPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true",
});
app.use(session({
  store: new pgSession({
    pool: sessionPool,
    tableName: "user_sessions"
  }),
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  }
}));

/* Static Directory */
app.use(express.static(path.join(process.cwd(), "public")));


/* Routes */
app.use("/", routes.root);
app.use("/auth", routes.auth);

app.use("/lobby", middleware.auth, routes.lobby);
app.use("/chat",  middleware.auth, routes.chat);

app.use("/testing", routes.test);


config.liveReload(app);
config.session(app);
config.sockets(io, app);

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


app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(http_errors(404));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
