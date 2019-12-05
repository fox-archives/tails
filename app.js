import path from "path";
import express from "express";
import hbs from "hbs";
import assetsRouter from "./routes/assetsRouter";
import projectsRouter from "./routes/projectsRouter";
import settingsRouter from './routes/settingsRouter';
import projectRouter from "./routes/projectRouter";

const app = express();

// config
app.enable("case sensitive routing");
app.set("json spaces", 2);
app.disable("strict routing");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.disable("x-powered-by");

app.engine("hbs", hbs.__express);
hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.localsAsTemplateData(app);

// middleware
app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));

// assets
app.use("/css", assetsRouter.cssRouter);
app.use("/", express.static(path.join(__dirname, "public")));

// routes:app
// setup a home page with 'reccomendations' and actions later
app.get("/", (req, res) => res.redirect("/projects"));
app.use("/projects", projectsRouter);
app.use('/settings', settingsRouter)

// routes:hosted (replace this with a different microservice later)
app.use("/project", projectRouter);

app.on("listening", () => console.log("server restarted"));
app.listen(3004);
