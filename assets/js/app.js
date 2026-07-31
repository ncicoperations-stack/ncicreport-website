document.querySelectorAll(".lookup-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(
      "Status lookup is in demonstration mode. Save your reference number for follow-up.",
    );
  });
});
