document.addEventListener("submit", (event) => {
  if (!event.target.matches(".report-form")) {
    return;
  }

  event.preventDefault();

  if (!window.validateRequired(event.target)) {
    alert("Please complete required fields.");
    return;
  }

  const reference = `NCIC-${new Date().getFullYear()}-${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

  sessionStorage.setItem("ncic-reference", reference);
  location.href = "../confirmation/success.html";
});
