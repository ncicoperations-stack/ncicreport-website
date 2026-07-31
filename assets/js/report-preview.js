/**
 * ============================================================
 * NCIC Report Preview
 * File: report-preview.js
 * Version: 2.0
 *
 * Generic Preview Engine
 * Supports all report types using report-config.js
 * ============================================================
 */

(() => {

    "use strict";

    /**
     * ------------------------------------------------------------
     * Public API
     * ------------------------------------------------------------
     */

    window.generateReportPreview = function () {

        const form = document.querySelector(".report-form");
        const preview = document.querySelector("#previewContent");

        if (!form || !preview) {
            return;
        }

        const reportType = form.dataset.reportType;
        const config = getReportConfig(reportType);

        preview.innerHTML = "";

        // --------------------------------------------------------
        // Common Sections
        // --------------------------------------------------------

        getReportSections().forEach(section => {

            buildSection(
                preview,
                section.title,
                section.fields
            );

        });

        // --------------------------------------------------------
        // Report Specific Section
        // --------------------------------------------------------

        if (config) {

            buildSection(
                preview,
                config.step3Title,
                config.fields
            );

        }

    };

    /**
     * ------------------------------------------------------------
     * Build Preview Section
     * ------------------------------------------------------------
     */

    function buildSection(container, title, fields) {

        const section = document.createElement("section");
        section.className = "preview-section";

        const heading = document.createElement("h4");
        heading.textContent = title;

        section.appendChild(heading);

        const list = document.createElement("dl");

        fields.forEach(name => {

            const field = document.querySelector(`[name="${name}"]`);

            if (!field) {
                return;
            }

            const value = getFieldValue(field);

            if (value === "") {
                return;
            }

            const dt = document.createElement("dt");
            dt.textContent = getFieldLabel(field);

            const dd = document.createElement("dd");
            dd.textContent = value;

            list.appendChild(dt);
            list.appendChild(dd);

        });

        if (list.children.length === 0) {
            return;
        }

        section.appendChild(list);
        container.appendChild(section);

    }

    /**
     * ------------------------------------------------------------
     * Display Value
     * ------------------------------------------------------------
     */

    function getFieldValue(field) {

        if (!field) {
            return "";
        }

        if (field.type === "checkbox") {
            return field.checked ? "Yes" : "";
        }

        if (field.type === "radio") {

            const checked = document.querySelector(
                `input[name="${field.name}"]:checked`
            );

            return checked ? checked.value : "";

        }

        if (field.tagName === "SELECT") {

            if (field.selectedIndex < 0) {
                return "";
            }

            return field.options[field.selectedIndex].text.trim();

        }

        if (field.type === "datetime-local") {

            if (!field.value) {
                return "";
            }

            return new Date(field.value).toLocaleString();

        }

        if (field.type === "date") {

            if (!field.value) {
                return "";
            }

            return new Date(field.value).toLocaleDateString();

        }

        if (field.name === "AmountLost") {

            if (!field.value) {
                return "";
            }

            const amount = Number(field.value);

            if (Number.isNaN(amount)) {
                return field.value;
            }

            return amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        }

        return field.value.trim();

    }

    /**
     * ------------------------------------------------------------
     * Field Label
     * ------------------------------------------------------------
     */

    function getFieldLabel(field) {

        const label = document.querySelector(
            `label[for="${field.id}"]`
        );

        if (!label) {
            return field.name;
        }

        return label.textContent
            .replace("*", "")
            .replace(/\s+/g, " ")
            .trim();

    }

    /**
     * ------------------------------------------------------------
     * Auto Refresh
     * ------------------------------------------------------------
     */

    function refreshPreview() {

        if (typeof window.getCurrentReportStep !== "function") {
            return;
        }

        if (window.getCurrentReportStep() !== 3) {
            return;
        }

        window.generateReportPreview();

    }

    /**
     * ------------------------------------------------------------
     * Initialize
     * ------------------------------------------------------------
     */

    document.addEventListener("DOMContentLoaded", () => {

        const form = document.querySelector(".report-form");

        if (!form) {
            return;
        }

        form.addEventListener("input", refreshPreview);
        form.addEventListener("change", refreshPreview);

    });

})();
