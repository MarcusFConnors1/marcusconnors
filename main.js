const nav = document.querySelector("[data-nav]");
const menu = document.querySelector("[data-menu]");
const links = document.querySelector("[data-links]");
const sections = [...document.querySelectorAll("main section[id]")];

menu.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
});

links.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    links.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "Menu";
  }
});

const onScroll = () => {
  nav.classList.toggle("is-solid", window.scrollY > 24);

  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= marker) current = section.id;
  }
  for (const link of links.querySelectorAll("a")) {
    const active = link.getAttribute("href") === `#${current}`;
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
