import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import flash from "connect-flash";
import utils from "./utils/utils.js";
import { router } from "./routes/router.js";
import { notFound, flashValidationErrors } from "./handlers/errorHandlers.js";
import "./handlers/passport.js";

// create express app
export const app = express();

// view engine setup
app.set("view engine", "ejs"); // We'll use ejs. Other options: pug, hbs, liquid etc.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // views folder is where we keep our ejs files

// Any files in public/ will be served as is (ex: images, css, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Bootstrap
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootswatch/dist/sketchy"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

// takes raw requests and sticks them onto req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev")); // for logging requests
app.use(cookieParser()); // parses cookies and sticks them to req.cookies

// session middleware
app.use(
  session({
    secret: process.env.PASSPORT_SECRET, // remember to input this in .env
    key: process.env.PASSPORT_COOKIE_KEY, // remember to input this in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONN }), // store sessions in mongoDB (not in memory)
  })
);

// Passport is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.u = utils;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.flashes = req.flash();
  next();
});

app.use("/", router);

app.use(notFound);

app.use(flashValidationErrors); // flash validation errors
