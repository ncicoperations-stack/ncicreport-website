document.addEventListener("submit", async (event) => {

  if (!event.target.matches(".report-form")) return;

  event.preventDefault();

  if (!window.validateRequired(event.target)) {
    alert("Please complete all required fields.");
    return;
  }

  const form = event.target;

  const formData = new FormData(form);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Get report type from the form or page
  data.reportType =
    form.dataset.reportType ||
    document.body.dataset.reportType ||
    "other";

  // Optional: collect category-specific fields
  data.categoryData = data.categoryData || {};

  try {

    const response = await fetch(window.NCIC_CONFIG.api.endpoint, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    const result = await response.json();

    if (!result.success) {

      alert(result.message || "Submission failed.");

      return;

    }

    sessionStorage.setItem(
      "ncic-reference",
      result.reference
    );

    location.href = "../confirmation/success.html";

  } catch (err) {

    console.error(err);

    alert(
      "Unable to submit your report.\nPlease try again."
    );

  }

});
