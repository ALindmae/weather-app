export function appShell() {
  const header = document.createElement("header");
  header.id = "header";
  const root = document.createElement("main");
  root.id = "root";
  return { header, root };
}
