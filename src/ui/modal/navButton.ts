export function addNavButton(open: () => void): void {
  const nav = document.querySelector("ul.primary.navigation.actions");
  if (!nav) return;

  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = "⚙️ Word Replacer";

  link.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  li.appendChild(link);
  nav.appendChild(li);
}
