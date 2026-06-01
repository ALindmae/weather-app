export function appShell() {
  const shell = document.createElement("div");
  shell.classList.add("app");
  const header = document.createElement("header");
  header.id = "header";
  const root = document.createElement("main");
  root.id = "root";

  shell.append(header, root);
  return { shell, header, root };
}
