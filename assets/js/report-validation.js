/**
 * ============================================================
 * NCIC Report Validation
 * File: report-validation.js
 * Version: 1.0
 *
 * Handles:
 * - Required fields
 * - Email validation
 * - Phone validation
 * - Number validation
 * - Error highlighting
 * ============================================================
 */

(() => {

    "use strict";

    /**
     * ------------------------------------------------------------
     * Validation Patterns
     * ------------------------------------------------------------
     */

    const EMAIL_PATTERN =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const PHONE_PATTERN =
        /^[0-9()+\-\s]{7,20}$/;

    /**
     * ------------------------------------------------------------
     * Public Validation Function
     * Called by report-wizard.js
     * ------------------------------------------------------------
     */

    window.validateCurrentStep = function(stepIndex) {

        const steps =
            document.querySelectorAll(".form-step");

        if (!steps.length) {

            return true;

        }

        const step = steps[stepIndex];

        if (!step) {

            return true;

        }

        clearErrors(step);

        let valid = true;

        const fields = step.querySelectorAll(
            "input, select, textarea"
        );

        fields.forEach(field => {

            if (!validateField(field)) {

                valid = false;

            }

        });

        if (!valid) {

            focusFirstError(step);

        }

        return valid;

    };

    /**
     * ------------------------------------------------------------
     * Validate Individual Field
     * ------------------------------------------------------------
     */

    function validateField(field) {

        let valid = true;

        const value = field.value.trim();

        /**
         * Required
         */

        if (field.hasAttribute("required")) {

            if (value === "") {

                showError(field);

                return false;

            }

        }

        /**
         * Email
         */

        if (
            field.type === "email" &&
            value !== ""
        ) {

            if (!EMAIL_PATTERN.test(value)) {

                showError(field);

                return false;

            }

        }

        /**
         * Phone
         */

        if (
            field.type === "tel" &&
            value !== ""
        ) {

            if (!PHONE_PATTERN.test(value)) {

                showError(field);

                return false;

            }

        }

        /**
         * Number
         */

        if (
            field.type === "number" &&
            value !== ""
        ) {

            const number =
                Number(value);

            if (Number.isNaN(number)) {

                showError(field);

                return false;

            }

            if (
                field.min &&
                number < Number(field.min)
            ) {

                showError(field);

                return false;

            }

            if (
                field.max &&
                number > Number(field.max)
            ) {

                showError(field);

                return false;

            }

        }

        clearFieldError(field);

        return valid;

    }
    /**
     * ------------------------------------------------------------
     * Display Validation Error
     * ------------------------------------------------------------
     */

    function showError(field) {

        field.classList.add("is-invalid");

        field.setAttribute(
            "aria-invalid",
            "true"
        );

        const group = field.closest(".form-group");

        if (group) {

            group.classList.add("has-error");

        }

    }

    /**
     * ------------------------------------------------------------
     * Remove Validation Error
     * ------------------------------------------------------------
     */

    function clearFieldError(field) {

        field.classList.remove("is-invalid");

        field.removeAttribute("aria-invalid");

        const group = field.closest(".form-group");

        if (group) {

            group.classList.remove("has-error");

        }

    }

    /**
     * ------------------------------------------------------------
     * Clear Current Step Errors
     * ------------------------------------------------------------
     */

    function clearErrors(step) {

        const fields =
            step.querySelectorAll(
                "input, select, textarea"
            );

        fields.forEach(field => {

            clearFieldError(field);

        });

    }

    /**
     * ------------------------------------------------------------
     * Focus First Invalid Field
     * ------------------------------------------------------------
     */

    function focusFirstError(step) {

        const firstError =
            step.querySelector(".is-invalid");

        if (!firstError) {

            return;

        }

        firstError.focus({

            preventScroll: false

        });

        firstError.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

    /**
     * ------------------------------------------------------------
     * Live Validation
     * ------------------------------------------------------------
     */

    document.addEventListener("DOMContentLoaded", () => {

        const form =
            document.querySelector(".report-form");

        if (!form) {

            return;

        }

        form.addEventListener("input", event => {

            validateField(event.target);

        });

        form.addEventListener("change", event => {

            validateField(event.target);

        });

    });

})();
