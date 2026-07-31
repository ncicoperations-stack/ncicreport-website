/**
 * ============================================================
 * NCIC Report Submission
 * File: submit.js
 * Version: 3.0
 *
 * Handles:
 * • Final validation
 * • Collect form data
 * • Submit to Google Apps Script
 * • Prevent duplicate submissions
 * • Display submission errors
 * • Store returned reference number
 * ============================================================
 */

(() => {

    "use strict";

    let submitting = false;

    document.addEventListener("DOMContentLoaded", () => {

        const form = document.querySelector(".report-form");

        if (!form) {
            return;
        }

        form.addEventListener("submit", submitReport);

    });

    async function submitReport(event) {

        event.preventDefault();

        if (submitting) {
            return;
        }

        const form = event.target;

        // Final validation
        if (
            typeof window.validateCurrentStep === "function" &&
            !window.validateCurrentStep(3)
        ) {
            return;
        }

        submitting = true;

        toggleSubmitButton(true);

        try {

            const payload = buildPayload(form);

           const body = new URLSearchParams({
    payload: JSON.stringify(payload)
});

const response = await fetch(
    window.NCIC_CONFIG.api.endpoint,
    {
        method: "POST",
        body
    }
);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                    "Submission failed."
                );
            }

            sessionStorage.setItem(
                "ncic-reference",
                result.reference
            );

            window.location.href =
                "/pages/confirmation/success.html";

        }
        catch (error) {

            console.error(
                "NCIC Submission Error:",
                error
            );

            alert(
                "Unable to submit your report.\n\nPlease try again."
            );

        }
        finally {

            submitting = false;

            toggleSubmitButton(false);

        }

    }

    function buildPayload(form) {

        const payload = {};

        const formData = new FormData(form);

        formData.forEach((value, key) => {

            if (payload[key]) {

                if (!Array.isArray(payload[key])) {
                    payload[key] = [payload[key]];
                }

                payload[key].push(value);

            }
            else {

                payload[key] = value;

            }

        });

        payload.reportType =
            form.dataset.reportType || "other";

        payload.timestamp =
            new Date().toISOString();

        payload.userAgent =
            navigator.userAgent;

        return payload;

    }

    function toggleSubmitButton(disabled) {

        const button = document.querySelector(
            'button[type="submit"]'
        );

        if (!button) {
            return;
        }

        button.disabled = disabled;

        if (disabled) {

            button.dataset.original =
                button.textContent;

            button.textContent =
                "Submitting...";

        }
        else {

            button.textContent =
                button.dataset.original ||
                "Submit Report";

        }

    }

})();
