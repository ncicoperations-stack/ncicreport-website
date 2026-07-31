const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const issuedReference = document.getElementById("issuedReference");

if (issuedReference) {
  issuedReference.textContent =
    sessionStorage.getItem("ncic-reference") || "NCIC-2026-000000";
}
