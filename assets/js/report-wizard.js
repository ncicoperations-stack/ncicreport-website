/**
 * ============================================================
 * NCIC Report Wizard
 * File: report-wizard.js
 * Version: 1.0
 *
 * Controls:
 * - Multi-step navigation
 * - Progress indicator
 * - Hidden backend fields
 * - Step visibility
 * - Validation hooks
 * - Preview hooks
 * ============================================================
 */

(() => {
    "use strict";

    /**
     * ------------------------------------------------------------
     * Configuration
     * ------------------------------------------------------------
     */

    const ACTIVE_CLASS = "active";
    const COMPLETED_CLASS = "completed";

    /**
     * ------------------------------------------------------------
     * State
     * ------------------------------------------------------------
     */

    let currentStep = 0;

    let reportForm = null;

    let steps = [];

    let progressSteps = [];

    let nextButtons = [];

    let previousButtons = [];

    /**
     * ------------------------------------------------------------
     * Initialize
     * ------------------------------------------------------------
     */

    document.addEventListener("DOMContentLoaded", initReportWizard);

    function initReportWizard() {

        reportForm = document.querySelector(".report-form");

        if (!reportForm) {
            return;
        }

        steps = Array.from(
            reportForm.querySelectorAll(".form-step")
        );

        progressSteps = Array.from(
            document.querySelectorAll(".progress-step")
        );

        nextButtons = Array.from(
            reportForm.querySelectorAll(".next-step")
        );

        previousButtons = Array.from(
            reportForm.querySelectorAll(".previous-step")
        );

        attachEvents();

        updateHiddenFields();

        showStep(0);

        updateProgress();

    }

    /**
     * ------------------------------------------------------------
     * Event Binding
     * ------------------------------------------------------------
     */

    function attachEvents() {

        nextButtons.forEach(button => {

            button.addEventListener("click", nextStep);

        });

        previousButtons.forEach(button => {

            button.addEventListener("click", previousStep);

        });

        reportForm.addEventListener("reset", () => {

            window.setTimeout(() => {

                currentStep = 0;

                showStep(0);

                updateProgress();

                updateHiddenFields();

            }, 10);

        });

    }

    /**
     * ------------------------------------------------------------
     * Show Current Step
     * ------------------------------------------------------------
     */

    function showStep(index) {

        if (index < 0 || index >= steps.length) {
            return;
        }

        steps.forEach(step => {

            step.hidden = true;

            step.classList.remove(ACTIVE_CLASS);

        });

        const activeStep = steps[index];

        activeStep.hidden = false;

        activeStep.classList.add(ACTIVE_CLASS);

        currentStep = index;

        updateProgress();

        scrollToCurrentStep();

        if (currentStep === steps.length - 1) {

            if (typeof generateReportPreview === "function") {

                generateReportPreview();

            }

        }

    }

    /**
     * ------------------------------------------------------------
     * Scroll
     * ------------------------------------------------------------
     */

    function scrollToCurrentStep() {

        steps[currentStep].scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }
    /**
     * ------------------------------------------------------------
     * Next Step
     * ------------------------------------------------------------
     */

    function nextStep() {

        if (currentStep >= steps.length - 1) {
            return;
        }

        /*
         * Validate current step before advancing.
         * Validation logic lives in report-validation.js
         */

        if (typeof validateCurrentStep === "function") {

            const isValid = validateCurrentStep(currentStep);

            if (!isValid) {
                return;
            }

        }

        showStep(currentStep + 1);

    }

    /**
     * ------------------------------------------------------------
     * Previous Step
     * ------------------------------------------------------------
     */

    function previousStep() {

        if (currentStep <= 0) {
            return;
        }

        showStep(currentStep - 1);

    }

    /**
     * ------------------------------------------------------------
     * Update Progress Indicator
     * ------------------------------------------------------------
     */

    function updateProgress() {

        progressSteps.forEach((step, index) => {

            step.classList.remove(
                ACTIVE_CLASS,
                COMPLETED_CLASS
            );

            if (index < currentStep) {

                step.classList.add(COMPLETED_CLASS);

            }

            if (index === currentStep) {

                step.classList.add(ACTIVE_CLASS);

            }

        });

    }

    /**
     * ------------------------------------------------------------
     * Populate Hidden Backend Fields
     * ------------------------------------------------------------
     */

    function updateHiddenFields() {

        const submissionDate =
            reportForm.querySelector("#submissionDate");

        const status =
            reportForm.querySelector("#status");

        const source =
            reportForm.querySelector("#source");

        if (submissionDate) {

            submissionDate.value =
                new Date().toISOString();

        }

        if (status) {

            status.value = "Pending Review";

        }

        if (source) {

            source.value = "Website";

        }

    }

    /**
     * ------------------------------------------------------------
     * Public Refresh
     * ------------------------------------------------------------
     *
     * Allows other scripts to refresh the wizard
     * after dynamic content changes.
     */

    window.refreshReportWizard = function () {

        showStep(currentStep);

        updateProgress();

    };

    /**
     * ------------------------------------------------------------
     * Debug Helper
     * ------------------------------------------------------------
     */

    window.getCurrentReportStep = function () {

        return currentStep;

    };

})();