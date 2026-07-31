const dataPrefix = location.pathname.includes("pages/") ? "../../" : "";

fetch(`${dataPrefix}data/alerts.json`)
  .then((response) => response.json())
  .then((alerts) => {
    const container = document.getElementById("cyberAlerts");

    if (!container) {
      return;
    }

    container.innerHTML = alerts
      .map(
        (alert) => `
          <article class="alert-card">
            <h3>${alert.title}</h3>
            <p>${alert.summary}</p>
            <small>${alert.date}</small>
          </article>
        `,
      )
      .join("");
  })
  .catch(() => {});
