document.querySelectorAll(".report-form").forEach((form) => {
  const storageKey = window.NCIC_CONFIG?.storageKey || "ncic-draft-report";

  form.addEventListener("input", () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(Object.fromEntries(new FormData(form))),
    );
  });
});
