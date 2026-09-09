/* =========================================================
   STUDENTKIT INDIA — UPGRADED SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
   ========================================================= */

let examCountdownTimer = null;
let compressedImageURL = null;


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeTools();
    initializeSmoothScrolling();
    initializeNavigation();

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) return;

    navLinks.classList.toggle("show");

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const menu = document.querySelector(".nav-links");

            if (menu) {
                menu.classList.remove("show");
            }

        });

    });

}


/* =========================================================
   SMOOTH SCROLLING
   ========================================================= */

function initializeSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {

                event.preventDefault();

                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


/* =========================================================
   PERCENTAGE CALCULATOR
   ========================================================= */

function calculatePercentage() {

    const obtainedInput =
        document.getElementById("obtainedMarks");

    const totalInput =
        document.getElementById("totalMarks");

    const resultBox =
        document.getElementById("resultBox");

    const result =
        document.getElementById("percentageResult");

    if (
        !obtainedInput ||
        !totalInput ||
        !result ||
        !resultBox
    ) {
        return;
    }

    const obtainedValue =
        obtainedInput.value.trim();

    const totalValue =
        totalInput.value.trim();

    if (!obtainedValue || !totalValue) {

        showCalculatorMessage(
            "Please enter both marks obtained and total marks.",
            "error"
        );

        return;
    }

    const obtained = Number(obtainedValue);
    const total = Number(totalValue);

    if (
        !Number.isFinite(obtained) ||
        !Number.isFinite(total)
    ) {

        showCalculatorMessage(
            "Please enter valid numbers.",
            "error"
        );

        return;
    }

    if (obtained < 0) {

        showCalculatorMessage(
            "Marks obtained cannot be negative.",
            "error"
        );

        return;
    }

    if (total <= 0) {

        showCalculatorMessage(
            "Total marks must be greater than 0.",
            "error"
        );

        return;
    }

    if (obtained > total) {

        showCalculatorMessage(
            "Marks obtained cannot be greater than total marks.",
            "error"
        );

        return;
    }

    const percentage =
        (obtained / total) * 100;

    const formattedPercentage =
        Number.isInteger(percentage)
            ? percentage.toString()
            : percentage.toFixed(2);

    result.textContent =
        formattedPercentage + "%";

    resultBox.classList.add("show");

    showCalculatorMessage(
        "Percentage calculated successfully.",
        "success"
    );

}


/* =========================================================
   CALCULATOR MESSAGE
   ========================================================= */

function showCalculatorMessage(text, type) {

    const message =
        document.getElementById("calculatorMessage");

    if (!message) return;

    message.textContent = text;

    message.className =
        "calculator-message";

    if (type) {
        message.classList.add(type);
    }

}


/* =========================================================
   COPY PERCENTAGE
   ========================================================= */

async function copyPercentage() {

    const result =
        document.getElementById("percentageResult");

    if (!result) return;

    const text =
        result.textContent.trim();

    if (!text || text === "0%") {

        showCalculatorMessage(
            "Calculate your percentage first.",
            "error"
        );

        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        showCalculatorMessage(
            "Percentage copied to clipboard.",
            "success"
        );

    } catch (error) {

        const temporaryInput =
            document.createElement("input");

        temporaryInput.value = text;

        document.body.appendChild(
            temporaryInput
        );

        temporaryInput.select();

        try {

            document.execCommand("copy");

            showCalculatorMessage(
                "Percentage copied to clipboard.",
                "success"
            );

        } catch (copyError) {

            showCalculatorMessage(
                "Unable to copy automatically. Please copy it manually.",
                "error"
            );

        }

        temporaryInput.remove();

    }

}


/* =========================================================
   ENTER KEY — PERCENTAGE
   ========================================================= */

document.addEventListener("keydown", function (event) {

    const activeElement =
        document.activeElement;

    if (
        activeElement &&
        (
            activeElement.id === "obtainedMarks" ||
            activeElement.id === "totalMarks"
        ) &&
        event.key === "Enter"
    ) {

        event.preventDefault();

        calculatePercentage();

    }

});


/* =========================================================
   TOOL SYSTEM
   ========================================================= */

function initializeTools() {

    const toolCards =
        document.querySelectorAll(".tool-card");

    toolCards.forEach(function (card) {

        const titleElement =
            card.querySelector("h3");

        const link =
            card.querySelector("a");

        if (!titleElement || !link) return;

        const title =
            titleElement.textContent
                .trim()
                .toLowerCase();

        if (title.includes("scientific calculator")) {

            link.textContent =
                "Open Tool";

            link.href =
                "#scientific-calculator";

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openScientificCalculator();

                }
            );

        }

        else if (title.includes("word counter")) {

            link.textContent =
                "Open Tool";

            link.href =
                "#word-counter";

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openWordCounter();

                }
            );

        }

        else if (title.includes("exam countdown")) {

            link.textContent =
                "Open Tool";

            link.href =
                "#exam-countdown";

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openExamCountdown();

                }
            );

        }

        else if (title.includes("pdf tools")) {

            link.textContent =
                "Open Tool";

            link.href =
                "#pdf-tools";

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openPDFTools();

                }
            );

        }

        else if (title.includes("image compressor")) {

            link.textContent =
                "Open Tool";

            link.href =
                "#image-compressor";

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openImageCompressor();

                }
            );

        }

    });

}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function createModal(title, content) {

    removeExistingModal();

    const overlay =
        document.createElement("div");

    overlay.className =
        "studentkit-modal-overlay";

    overlay.innerHTML = `
        <div
            class="studentkit-modal"
            role="dialog"
            aria-modal="true"
            aria-label="${escapeHTML(title)}"
        >

            <button
                class="studentkit-modal-close"
                aria-label="Close"
                type="button"
            >
                ×
            </button>

            <h2>${escapeHTML(title)}</h2>

            <div class="studentkit-modal-content">
                ${content}
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    const closeButton =
        overlay.querySelector(
            ".studentkit-modal-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            removeExistingModal
        );

        closeButton.focus();

    }

    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {

                removeExistingModal();

            }

        }
    );

    document.addEventListener(
        "keydown",
        handleModalEscape
    );

    return overlay;

}


function handleModalEscape(event) {

    if (event.key === "Escape") {

        removeExistingModal();

    }

}


function removeExistingModal() {

    const existing =
        document.querySelector(
            ".studentkit-modal-overlay"
        );

    if (existing) {

        existing.remove();

    }

    if (examCountdownTimer) {

        clearInterval(
            examCountdownTimer
        );

        examCountdownTimer = null;

    }

    if (compressedImageURL) {

        URL.revokeObjectURL(
            compressedImageURL
        );

        compressedImageURL = null;

    }

    document.removeEventListener(
        "keydown",
        handleModalEscape
    );

}


/* =========================================================
   SCIENTIFIC CALCULATOR
   ========================================================= */

function openScientificCalculator() {

    const modal = createModal(
        "Scientific Calculator",
        `
        <div class="scientific-calculator">

            <input
                type="text"
                id="scientificDisplay"
                class="scientific-display"
                placeholder="0"
                readonly
                aria-label="Calculator display"
            >

            <div class="scientific-buttons">

                <button type="button" data-value="7">7</button>
                <button type="button" data-value="8">8</button>
                <button type="button" data-value="9">9</button>
                <button type="button" data-value="/">÷</button>

                <button type="button" data-value="4">4</button>
                <button type="button" data-value="5">5</button>
                <button type="button" data-value="6">6</button>
                <button type="button" data-value="*">×</button>

                <button type="button" data-value="1">1</button>
                <button type="button" data-value="2">2</button>
                <button type="button" data-value="3">3</button>
                <button type="button" data-value="-">−</button>

                <button type="button" data-value="0">0</button>
                <button type="button" data-value=".">.</button>
                <button type="button" data-action="clear">C</button>
                <button type="button" data-value="+">+</button>

                <button type="button" data-value="(">(</button>
                <button type="button" data-value=")">)</button>
                <button type="button" data-value="%">%</button>
                <button type="button" data-action="calculate">=</button>

            </div>

            <div class="calculator-hint">
                Supports basic arithmetic, brackets and percentages.
            </div>

        </div>
        `
    );

    const display =
        modal.querySelector(
            "#scientificDisplay"
        );

    const buttons =
        modal.querySelectorAll(
            ".scientific-buttons button"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    this.dataset.value;

                const action =
                    this.dataset.action;

                if (action === "clear") {

                    display.value = "";

                    return;
                }

                if (action === "calculate") {

                    calculateScientificExpression(
                        display
                    );

                    return;
                }

                if (value) {

                    display.value += value;

                }

            }
        );

    });

    document.addEventListener(
        "keydown",
        handleCalculatorKeyboard
    );

}


function handleCalculatorKeyboard(event) {

    const display =
        document.getElementById(
            "scientificDisplay"
        );

    if (!display) return;

    const allowed =
        "0123456789+-*/().%";

    if (
        allowed.includes(event.key)
    ) {

        display.value += event.key;

        event.preventDefault();

    }

    else if (
        event.key === "Enter"
    ) {

        calculateScientificExpression(
            display
        );

        event.preventDefault();

    }

    else if (
        event.key === "Backspace"
    ) {

        display.value =
            display.value.slice(0, -1);

        event.preventDefault();

    }

}


function calculateScientificExpression(display) {

    let expression =
        display.value.trim();

    if (!expression) return;

    if (
        !/^[0-9+\-*/().%\s]+$/.test(
            expression
        )
    ) {

        showCalculatorError(
            display,
            "Invalid"
        );

        return;
    }

    try {

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error(
                "Invalid result"
            );

        }

        display.value =
            Number.isInteger(result)
                ? String(result)
                : String(
                    Number(
                        result.toFixed(10)
                    )
                );

    } catch (error) {

        showCalculatorError(
            display,
            "Error"
        );

    }

}


function showCalculatorError(
    display,
    message
) {

    display.value = message;

    setTimeout(function () {

        if (display) {
            display.value = "";
        }

    }, 900);

}


/* =========================================================
   WORD COUNTER
   ========================================================= */

function openWordCounter() {

    const modal = createModal(
        "Word Counter",
        `
        <textarea
            id="wordCounterInput"
            rows="9"
            placeholder="Type or paste your text here..."
            aria-label="Text for word counter"
        ></textarea>

        <div class="word-counter-results">

            <div>
                <strong id="wordCount">0</strong>
                <span>Words</span>
            </div>

            <div>
                <strong id="characterCount">0</strong>
                <span>Characters</span>
            </div>

            <div>
                <strong id="characterNoSpaceCount">0</strong>
                <span>Without Spaces</span>
            </div>

            <div>
                <strong id="sentenceCount">0</strong>
                <span>Sentences</span>
            </div>

            <div>
                <strong id="lineCount">0</strong>
                <span>Lines</span>
            </div>

            <div>
                <strong id="readingTime">0 min</strong>
                <span>Reading Time</span>
            </div>

        </div>

        <div class="word-counter-actions">

            <button
                type="button"
                id="copyTextButton"
            >
                Copy Text
            </button>

            <button
                type="button"
                id="clearTextButton"
            >
                Clear
            </button>

        </div>
        `
    );

    const textarea =
        modal.querySelector(
            "#wordCounterInput"
        );

    textarea.addEventListener(
        "input",
        updateWordCounter
    );

    const copyButton =
        modal.querySelector(
            "#copyTextButton"
        );

    const clearButton =
        modal.querySelector(
            "#clearTextButton"
        );

    copyButton.addEventListener(
        "click",
        async function () {

            if (!textarea.value) return;

            try {

                await navigator.clipboard.writeText(
                    textarea.value
                );

                copyButton.textContent =
                    "Copied";

                setTimeout(function () {

                    copyButton.textContent =
                        "Copy Text";

                }, 1200);

            } catch (error) {

                textarea.select();

                document.execCommand(
                    "copy"
                );

            }

        }
    );

    clearButton.addEventListener(
        "click",
        function () {

            textarea.value = "";

            updateWordCounter();

            textarea.focus();

        }
    );

    textarea.focus();

}


function updateWordCounter() {

    const textarea =
        document.getElementById(
            "wordCounterInput"
        );

    if (!textarea) return;

    const text =
        textarea.value;

    const trimmed =
        text.trim();

    const words =
        trimmed === ""
            ? []
            : trimmed.split(/\s+/);

    const sentences =
        trimmed === ""
            ? []
            : trimmed
                .split(/[.!?]+/)
                .filter(
                    function (item) {
                        return item.trim() !== "";
                    }
                );

    const lines =
        text === ""
            ? 0
            : text.split(/\r?\n/).length;

    const readingMinutes =
        words.length === 0
            ? 0
            : Math.max(
                1,
                Math.ceil(
                    words.length / 200
                )
            );

    setText(
        "wordCount",
        words.length
    );

    setText(
        "characterCount",
        text.length
    );

    setText(
        "characterNoSpaceCount",
        text.replace(/\s/g, "").length
    );

    setText(
        "sentenceCount",
        sentences.length
    );

    setText(
        "lineCount",
        lines
    );

    setText(
        "readingTime",
        readingMinutes + " min"
    );

}


/* =========================================================
   EXAM COUNTDOWN
   ========================================================= */

function openExamCountdown() {

    const modal = createModal(
        "Exam Countdown",
        `
        <p>Select your exam date:</p>

        <input
            type="date"
            id="examDateInput"
            aria-label="Exam date"
        >

        <div
            id="countdownResult"
            class="countdown-result"
        >
            Select a future date to start the countdown.
        </div>

        <button
            type="button"
            id="clearExamDate"
        >
            Clear Date
        </button>
        `
    );

    const dateInput =
        modal.querySelector(
            "#examDateInput"
        );

    const clearButton =
        modal.querySelector(
            "#clearExamDate"
        );

    dateInput.min =
        getTodayDate();

    dateInput.addEventListener(
        "change",
        updateExamCountdown
    );

    clearButton.addEventListener(
        "click",
        function () {

            dateInput.value = "";

            const result =
                modal.querySelector(
                    "#countdownResult"
                );

            result.textContent =
                "Select a future date to start the countdown.";

        }
    );

}


function updateExamCountdown() {

    const input =
        document.getElementById(
            "examDateInput"
        );

    const result =
        document.getElementById(
            "countdownResult"
        );

    if (!input || !result) return;

    if (!input.value) return;

    if (examCountdownTimer) {

        clearInterval(
            examCountdownTimer
        );

    }

    function update() {

        const target =
            new Date(
                input.value +
                "T00:00:00"
            );

        const now =
            new Date();

        const difference =
            target.getTime() -
            now.getTime();

        if (difference <= 0) {

            result.textContent =
                "The selected exam date has arrived.";

            clearInterval(
                examCountdownTimer
            );

            examCountdownTimer = null;

            return;
        }

        const totalSeconds =
            Math.floor(
                difference / 1000
            );

        const days =
            Math.floor(
                totalSeconds / 86400
            );

        const hours =
            Math.floor(
                (totalSeconds % 86400) /
                3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) /
                60
            );

        const seconds =
            totalSeconds % 60;

        result.innerHTML = `
            <strong>${days}</strong> days
            <strong>${hours}</strong> hours
            <strong>${minutes}</strong> minutes
            <strong>${seconds}</strong> seconds
            remaining
        `;

    }

    update();

    examCountdownTimer =
        setInterval(
            update,
            1000
        );

}


/* =========================================================
   PDF TOOLS
   ========================================================= */

function openPDFTools() {

    const modal = createModal(
        "PDF Tools",
        `
        <p>
            Select a PDF to view its basic information
            and open it in a new browser tab.
        </p>

        <input
            type="file"
            id="pdfInput"
            accept="application/pdf,.pdf"
        >

        <div
            id="pdfInfo"
            class="tool-result"
        >
            No PDF selected.
        </div>

        <div
            id="pdfActions"
            class="tool-actions"
            style="display:none;"
        >

            <button
                type="button"
                id="openPDFButton"
            >
                Open PDF
            </button>

            <button
                type="button"
                id="downloadPDFButton"
            >
                Download PDF
            </button>

        </div>

        <iframe
            id="pdfPreview"
            title="PDF Preview"
            style="
                display:none;
                width:100%;
                height:500px;
                border:1px solid #ddd;
                border-radius:10px;
                margin-top:16px;
            "
        ></iframe>
        `
    );

    const input =
        modal.querySelector(
            "#pdfInput"
        );

    const info =
        modal.querySelector(
            "#pdfInfo"
        );

    const actions =
        modal.querySelector(
            "#pdfActions"
        );

    const preview =
        modal.querySelector(
            "#pdfPreview"
        );

    let pdfURL = null;

    input.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {

                info.textContent =
                    "No PDF selected.";

                actions.style.display =
                    "none";

                preview.style.display =
                    "none";

                return;
            }

            if (
                file.type !==
                "application/pdf" &&
                !file.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                info.textContent =
                    "Please select a valid PDF file.";

                actions.style.display =
                    "none";

                return;
            }

            if (pdfURL) {

                URL.revokeObjectURL(
                    pdfURL
                );

            }

            pdfURL =
                URL.createObjectURL(
                    file
                );

            info.innerHTML = `
                <strong>File:</strong>
                ${escapeHTML(file.name)}
                <br>
                <strong>Size:</strong>
                ${formatFileSize(file.size)}
                <br>
                <strong>Type:</strong>
                PDF
            `;

            actions.style.display =
                "flex";

            preview.src =
                pdfURL;

            preview.style.display =
                "block";

        }
    );

    modal.querySelector(
        "#openPDFButton"
    ).addEventListener(
        "click",
        function () {

            if (pdfURL) {

                window.open(
                    pdfURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        }
    );

    modal.querySelector(
        "#downloadPDFButton"
    ).addEventListener(
        "click",
        function () {

            if (!pdfURL) return;

            const file =
                input.files[0];

            const link =
                document.createElement("a");

            link.href =
                pdfURL;

            link.download =
                file
                    ? file.name
                    : "studentkit-document.pdf";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

        }
    );

}


/* =========================================================
   IMAGE COMPRESSOR
   ========================================================= */

function openImageCompressor() {

    const modal = createModal(
        "Image Compressor",
        `
        <p>
            Choose an image, select quality and compress it
            directly in your browser.
        </p>

        <input
            type="file"
            id="imageInput"
            accept="image/*"
        >

        <label for="imageQuality">
            Quality:
            <span id="qualityValue">70%</span>
        </label>

        <input
            type="range"
            id="imageQuality"
            min="10"
            max="100"
            value="70"
        >

        <div
            id="imageInfo"
            class="tool-result"
        >
            No image selected.
        </div>

        <button
            id="compressImageButton"
            type="button"
        >
            Compress Image
        </button>

        <a
            id="compressedDownload"
            style="display:none;"
            download="studentkit-compressed.jpg"
        >
            Download Compressed Image
        </a>

        <img
            id="compressedPreview"
            alt="Compressed image preview"
            style="
                display:none;
                max-width:100%;
                margin-top:16px;
                border-radius:10px;
            "
        >
        `
    );

    const input =
        modal.querySelector(
            "#imageInput"
        );

    const quality =
        modal.querySelector(
            "#imageQuality"
        );

    const qualityValue =
        modal.querySelector(
            "#qualityValue"
        );

    const compressButton =
        modal.querySelector(
            "#compressImageButton"
        );

    quality.addEventListener(
        "input",
        function () {

            qualityValue.textContent =
                this.value + "%";

        }
    );

    input.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            const info =
                modal.querySelector(
                    "#imageInfo"
                );

            if (!file) {

                info.textContent =
                    "No image selected.";

                return;
            }

            info.innerHTML = `
                <strong>File:</strong>
                ${escapeHTML(file.name)}
                <br>
                <strong>Original size:</strong>
                ${formatFileSize(file.size)}
                <br>
                <strong>Type:</strong>
                ${escapeHTML(file.type || "Image")}
            `;

        }
    );

    compressButton.addEventListener(
        "click",
        function () {

            const file =
                input.files[0];

            if (!file) {

                showToolMessage(
                    modal,
                    "Please select an image first."
                );

                return;
            }

            compressImage(
                file,
                Number(quality.value),
                modal
            );

        }
    );

}


function compressImage(
    file,
    quality,
    modal
) {

    const reader =
        new FileReader();

    reader.onerror =
        function () {

            showToolMessage(
                modal,
                "Unable to read this image."
            );

        };

    reader.onload =
        function (event) {

            const image =
                new Image();

            image.onerror =
                function () {

                    showToolMessage(
                        modal,
                        "The selected image could not be processed."
                    );

                };

            image.onload =
                function () {

                    const canvas =
                        document.createElement(
                            "canvas"
                        );

                    const maxWidth = 1600;
                    const maxHeight = 1600;

                    let width =
                        image.naturalWidth;

                    let height =
                        image.naturalHeight;

                    if (
                        width > maxWidth
                    ) {

                        height =
                            Math.round(
                                height *
                                (
                                    maxWidth /
                                    width
                                )
                            );

                        width =
                            maxWidth;

                    }

                    if (
                        height > maxHeight
                    ) {

                        width =
                            Math.round(
                                width *
                                (
                                    maxHeight /
                                    height
                                )
                            );

                        height =
                            maxHeight;

                    }

                    canvas.width =
                        width;

                    canvas.height =
                        height;

                    const context =
                        canvas.getContext(
                            "2d"
                        );

                    if (!context) {

                        showToolMessage(
                            modal,
                            "Your browser could not create the image canvas."
                        );

                        return;
                    }

                    context.fillStyle =
                        "#ffffff";

                    context.fillRect(
                        0,
                        0,
                        width,
                        height
                    );

                    context.drawImage(
                        image,
                        0,
                        0,
                        width,
                        height
                    );

                    canvas.toBlob(
                        function (blob) {

                            if (!blob) {

                                showToolMessage(
                                    modal,
                                    "Compression failed. Please try another image."
                                );

                                return;
                            }

                            if (
                                compressedImageURL
                            ) {

                                URL.revokeObjectURL(
                                    compressedImageURL
                                );

                            }

                            compressedImageURL =
                                URL.createObjectURL(
                                    blob
                                );

                            const download =
                                modal.querySelector(
                                    "#compressedDownload"
                                );

                            const info =
                                modal.querySelector(
                                    "#imageInfo"
                                );

                            const preview =
                                modal.querySelector(
                                    "#compressedPreview"
                                );

                            download.href =
                                compressedImageURL;

                            download.download =
                                "studentkit-compressed.jpg";

                            download.style.display =
                                "inline-block";

                            download.textContent =
                                "Download Compressed Image";

                            preview.src =
                                compressedImageURL;

                            preview.style.display =
                                "block";

                            const originalSize =
                                file.size;

                            const compressedSize =
                                blob.size;

                            const savedBytes =
                                Math.max(
                                    0,
                                    originalSize -
                                    compressedSize
                                );

                            const savedPercent =
                                originalSize > 0
                                    ? (
                                        savedBytes /
                                        originalSize
                                    ) * 100
                                    : 0;

                            info.innerHTML = `
                                <strong>File:</strong>
                                ${escapeHTML(file.name)}
                                <br>
                                <strong>Original size:</strong>
                                ${formatFileSize(originalSize)}
                                <br>
                                <strong>Compressed size:</strong>
                                ${formatFileSize(compressedSize)}
                                <br>
                                <strong>Saved:</strong>
                                ${savedPercent.toFixed(1)}%
                                (${formatFileSize(savedBytes)})
                                <br>
                                <strong>Dimensions:</strong>
                                ${width} × ${height}
                            `;

                        },
                        "image/jpeg",
                        Math.min(
                            1,
                            Math.max(
                                0.1,
                                quality / 100
                            )
                        )
                    );

                };

            image.src =
                event.target.result;

        };

    reader.readAsDataURL(
        file
    );

}


/* =========================================================
   GENERIC TOOL MESSAGE
   ========================================================= */

function showToolMessage(
    modal,
    message
) {

    const info =
        modal.querySelector(
            ".tool-result"
        );

    if (!info) {

        alert(message);

        return;
    }

    info.textContent =
        message;

}


/* =========================================================
   FILE SIZE
   ========================================================= */

function formatFileSize(bytes) {

    if (
        !Number.isFinite(bytes) ||
        bytes <= 0
    ) {

        return "0 Bytes";

    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const index =
        Math.min(
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            ),
            units.length - 1
        );

    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        )
        +
        " " +
        units[index]
    );

}


/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   SET TEXT HELPER
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   TODAY DATE
   ========================================================= */

function getTodayDate() {

    const date =
        new Date();

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


/* =========================================================
   GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.warn(
            "StudentKit error:",
            event.message
        );

    }
);


/* =========================================================
   EXPORT FUNCTIONS
   ========================================================= */

window.toggleMenu =
    toggleMenu;

window.calculatePercentage =
    calculatePercentage;

window.copyPercentage =
    copyPercentage;

window.openScientificCalculator =
    openScientificCalculator;

window.openWordCounter =
    openWordCounter;

window.openExamCountdown =
    openExamCountdown;

window.openPDFTools =
    openPDFTools;

window.openImageCompressor =
    openImageCompressor;


/* =========================================================
   INITIALIZED
   ========================================================= */

console.log(
    "StudentKit India — upgraded tools initialized successfully."
);
