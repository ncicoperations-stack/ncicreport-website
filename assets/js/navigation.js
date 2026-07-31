document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const menu = document.getElementById("primary-menu");

    menu?.classList.toggle("is-open");
    button.setAttribute(
      "aria-expanded",
      menu?.classList.contains("is-open") ? "true" : "false",
    );
  });
});
