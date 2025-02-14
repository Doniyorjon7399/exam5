import express from "express";
import "dotenv/config";
import { create } from "express-handlebars";
import Routes from "./routes/routes.js";
import path from "node:path";
import connectDb from "./config/datbase.js";
import flash from "connect-flash";
import session from "express-session";
import tokenMiddilvear from "./middleware/token.js";
import cookieParser from "cookie-parser";
import ifequal from "./utils/index.js";

const port = process.env.PORT;
const key = process.env.KEY;
const viewsPath = path.join(process.cwd(), "src", "views");
const app = express();

const hbs = create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  defaultLayout: "main",
  extname: "hbs",
  helpers: ifequal,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: key, resave: false, saveUninitialized: false }));
app.use(flash());
app.use(tokenMiddilvear);
app.use(Routes());

const boostrab = async () => {
  try {
    await connectDb();
    console.log("connect database");
    app.listen(port, () => console.log(`server is running port: ${port}`));
  } catch (error) {
    console.error(error.message);
  }
};

boostrab();
