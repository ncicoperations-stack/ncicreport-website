/**
 * ============================================================
 * NCIC Report Submission
 * File: submit.js
 * Version: 4.0
 *
 * Handles:
 * • Final validation
 * • Collect form data
 * • Prevent duplicate submissions
 * • Submit to Google Apps Script
 * • Store reference number
 * • Redirect on success
 * • Display friendly errors
 * ============================================================
 */

(() => {

    "use strict";

    let submitting = false;

    document.addEventListener("DOMContentLoaded", initializeSubmission);

    function initializeSubmission() {

        const form = document.querySelector(".report-form");

        if (!form) {
            return;
        }

        form.addEventListener("submit", submitReport);

    }

    async function submitReport(event) {

        event.preventDefault();

        if (submitting) {
            return;
        }

        const form = event.target;

        // --------------------------------------------------------
        // Final Validation
        // --------------------------------------------------------

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

                    body: body

                }

            );

            if (!response.ok) {

                throw new Error(

                    `HTTP ${response.status}`

                );

            }

            const result = await response.json();

console.log("API Response:", result);
console.log("Reference:", result.reference);

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

            localStorage.removeItem(

                window.NCIC_CONFIG.storageKey

            );

            window.location.href =
                "/pages/confirmation/success.html";

        }

        catch (error) {

            console.error(

                "NCIC Submission Error:",

                error

            );

            let message =
                "Unable to submit your report.";

            if (

                error.message.includes("HTTP")

            ) {

                message =
                    "The reporting service is currently unavailable.\n\nPlease try again in a few minutes.";

            }

            alert(message);

        }

        finally {

            submitting = false;

            toggleSubmitButton(false);

        }

    }

    /************************************************************
     * BUILD PAYLOAD
     ************************************************************/

    function buildPayload(form) {

        const payload = {};

        const formData = new FormData(form);

        formData.forEach((value, key) => {

            if (payload[key]) {

                if (!Array.isArray(payload[key])) {

                    payload[key] = [

                        payload[key]

                    ];

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

    /************************************************************
     * SUBMIT BUTTON
     ************************************************************/

    function toggleSubmitButton(disabled) {

        const button = document.querySelector(

            'button[type="submit"]'

        );

        if (!button) {

            return;

        }

        button.disabled = disabled;

        if (disabled) {

            button.dataset.originalText =
                button.textContent;

            button.textContent =
                "Submitting...";

        }
        else {

            button.textContent =
                button.dataset.originalText ||
                "Submit Report";

        }

    }

})();
