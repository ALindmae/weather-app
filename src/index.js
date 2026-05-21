import "./styles.css";
import { appShell } from "./core/appShell";
import { createRouter } from "./core/router";
import { handleRender } from "./core/render";

const { header, root } = appShell();
document.body.append(header, root);

const app = {
  root: root,
  header: header,
};

const router = createRouter(app, handleRender);

app.navigate = router.navigate;

router.init();
