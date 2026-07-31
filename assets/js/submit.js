document.addEventListener("submit", async (event) => {
  const form = event.target;

  if (!form.matches(".report-form")) {
    return;
  }

  event.preventDefault();

  if (!window.validateRequired(form)) {
    alert("Please complete all required fields.");
    return;
  }

  const formData = new FormData(form);

  const payload = {};

  formData.forEach((value, key) => {
    payload[key] = value;
  });

  payload.reportType =
    form.dataset.reportType ||
    document.body.dataset.reportType ||
    "other";

  try {
    const response = await fetch(window.NCIC_CONFIG.api.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Submission failed.");
    }

    sessionStorage.setItem("ncic-reference", result.reference);

    window.location.href = "../confirmation/success.html";

  } catch (error) {

    console.error("Submission Error:", error);

    alert(
      "We couldn't submit your report at this time.\n\nPlease try again in a few moments."
    );
  }
});
