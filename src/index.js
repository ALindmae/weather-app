import "./styles.css";
import { appShell } from "./core/appShell";
import { createRouter } from "./core/router";
import { handleRender } from "./core/render";

const content = appShell();
document.body.appendChild(content);

const app = {
  content: content,
};

const router = createRouter(app, handleRender);

app.navigate = router.navigate;

router.init();
