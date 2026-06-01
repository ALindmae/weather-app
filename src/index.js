import "./styles.css";
import { appShell } from "./core/appShell";
import { createRouter } from "./core/router";
import { handleRender } from "./core/render";

const { shell, header, root } = appShell();

document.body.append(shell);

const app = {
  root: root,
  header: header,
};

const router = createRouter(app, handleRender);

app.navigate = router.navigate;

router.init();
