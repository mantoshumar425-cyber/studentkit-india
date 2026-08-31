/* =========================================================
   STUDENTKIT INDIA — COMPLETE SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) return;

    navLinks.classList.toggle("show");
}

/* Close mobile menu after clicking a navigation link */
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const menu = document.querySelector(".nav-links");

            if (menu) {
                menu.classList.remove("show");
            }
        });
    });

    initializeTools();
    initializeSmoothScrolling();
});


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

    const obtainedInput = document.getElementById("obtainedMarks");
    const totalInput = document.getElementById("totalMarks");

    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("percentageResult");
    const message = document.getElementById("calculatorMessage");

    if (!obtainedInput || !totalInput || !result || !resultBox) {
        return;
    }

    const obtained = Number(obtainedInput.value);
    const total = Number(totalInput.value);

    if (
        obtainedInput.value.trim() === "" ||
        totalInput.value.trim() === ""
    ) {
        showCalculatorMessage(
            "Please enter both marks obtained and total marks.",
            "error"
        );
        return;
    }

    if (!Number.isFinite(obtained) || !Number.isFinite(total)) {
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

    const percentage = (obtained / total) * 100;

    let formattedPercentage;

    if (Number.isInteger(percentage)) {
        formattedPercentage = percentage.toString();
    } else {
        formattedPercentage = percentage.toFixed(2);
    }

    result.textContent = formattedPercentage + "%";

    resultBox.classList.add("show");

    showCalculatorMessage(
        "Percentage calculated successfully.",
        "success"
    );
}


/* Calculator message helper */

function showCalculatorMessage(text, type) {

    const message = document.getElementById("calculatorMessage");

    if (!message) return;

    message.textContent = text;

    message.className = "calculator-message";

    if (type) {
        message.classList.add(type);
    }
}


/* =========================================================
   COPY PERCENTAGE RESULT
   ========================================================= */

async function copyPercentage() {

    const result = document.getElementById("percentageResult");

    if (!result) return;

    const text = result.textContent.trim();

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
            "Percentage copied to clipboard!",
            "success"
        );

    } catch (error) {

        /* Fallback for older browsers */

        const temporaryInput = document.createElement("input");

        temporaryInput.value = text;

        document.body.appendChild(temporaryInput);

        temporaryInput.select();

        try {
            document.execCommand("copy");

            showCalculatorMessage(
                "Percentage copied to clipboard!",
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
   ENTER KEY SUPPORT FOR PERCENTAGE CALCULATOR
   ========================================================= */

document.addEventListener("keydown", function (event) {

    const activeElement = document.activeElement;

    if (
        activeElement &&
        (
            activeElement.id === "obtainedMarks" ||
            activeElement.id === "totalMarks"
        ) &&
        event.key === "Enter"
    ) {
        calculatePercentage();
    }
});


/* =========================================================
   TOOL SYSTEM
   ========================================================= */

function initializeTools() {

    const toolCards = document.querySelectorAll(".tool-card");

    toolCards.forEach(function (card) {

        const titleElement = card.querySelector("h3");
        const link = card.querySelector("a");

        if (!titleElement || !link) return;

        const title = titleElement.textContent.trim();

        /*
         * Remove old "Coming Soon" behaviour.
         * Every tool gets a functional action.
         */

        if (title === "Scientific Calculator") {

            link.textContent = "Open Tool →";

            link.href = "#scientific-calculator";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                openScientificCalculator();
            });
        }

        else if (title === "Word Counter") {

            link.textContent = "Open Tool →";

            link.href = "#word-counter";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                openWordCounter();
            });
        }

        else if (title === "Exam Countdown") {

            link.textContent = "Open Tool →";

            link.href = "#exam-countdown";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                openExamCountdown();
            });
        }

        else if (title === "PDF Tools") {

            link.textContent = "Open Tool →";

            link.href = "#pdf-tools";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                openPDFTools();
            });
        }

        else if (title === "Image Compressor") {

            link.textContent = "Open Tool →";

            link.href = "#image-compressor";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                openImageCompressor();
            });
        }
    });
}


/* =========================================================
   CREATE TOOL MODAL
   ========================================================= */

function createModal(title, content) {

    removeExistingModal();

    const overlay = document.createElement("div");

    overlay.className = "studentkit-modal-overlay";

    overlay.innerHTML = `
        <div class="studentkit-modal" role="dialog" aria-modal="true">

            <button
                class="studentkit-modal-close"
                aria-label="Close"
                type="button"
            >
                ×
            </button>

            <h2>${title}</h2>

            <div class="studentkit-modal-content">
                ${content}
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    const closeButton =
        overlay.querySelector(".studentkit-modal-close");

    closeButton.addEventListener("click", removeExistingModal);

    overlay.addEventListener("click", function (event) {

        if (event.target === overlay) {
            removeExistingModal();
        }
    });

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
        document.querySelector(".studentkit-modal-overlay");

    if (existing) {
        existing.remove();
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
            >

            <div class="scientific-buttons">

                <button data-value="7">7</button>
                <button data-value="8">8</button>
                <button data-value="9">9</button>
                <button data-value="/">÷</button>

                <button data-value="4">4</button>
                <button data-value="5">5</button>
                <button data-value="6">6</button>
                <button data-value="*">×</button>

                <button data-value="1">1</button>
                <button data-value="2">2</button>
                <button data-value="3">3</button>
                <button data-value="-">−</button>

                <button data-value="0">0</button>
                <button data-value=".">.</button>
                <button data-action="clear">C</button>
                <button data-value="+">+</button>

                <button data-value="(">(</button>
                <button data-value=")">)</button>
                <button data-value="%">%</button>
                <button data-action="calculate">=</button>

            </div>

        </div>
        `
    );

    const display =
        modal.querySelector("#scientificDisplay");

    const buttons =
        modal.querySelectorAll(".scientific-buttons button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const value = this.dataset.value;
            const action = this.dataset.action;

            if (action === "clear") {
                display.value = "";
                return;
            }

            if (action === "calculate") {
                calculateScientificExpression(display);
                return;
            }

            if (value) {
                display.value += value;
            }
        });
    });
}


function calculateScientificExpression(display) {

    let expression = display.value.trim();

    if (!expression) {
        return;
    }

    /*
     * Basic safe calculator parser.
     * Only mathematical characters are allowed.
     */

    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {

        display.value = "Invalid";

        setTimeout(function () {
            display.value = "";
        }, 900);

        return;
    }

    try {

        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        /*
         * Function constructor is used only after
         * strict character validation above.
         */

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {
            throw new Error("Invalid result");
        }

        display.value =
            Number.isInteger(result)
                ? result
                : Number(result.toFixed(10));

    } catch (error) {

        display.value = "Error";

        setTimeout(function () {
            display.value = "";
        }, 900);
    }
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
            rows="8"
            placeholder="Type or paste your text here..."
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
                <strong id="lineCount">0</strong>
                <span>Lines</span>
            </div>

        </div>
        `
    );

    const textarea =
        modal.querySelector("#wordCounterInput");

    textarea.addEventListener("input", updateWordCounter);

    textarea.focus();
}


function updateWordCounter() {

    const textarea =
        document.getElementById("wordCounterInput");

    if (!textarea) return;

    const text = textarea.value;

    const words =
        text.trim() === ""
            ? []
            : text.trim().split(/\s+/);

    const lines =
        text === ""
            ? 0
            : text.split(/\r?\n/).length;

    const wordCount =
        document.getElementById("wordCount");

    const characterCount =
        document.getElementById("characterCount");

    const noSpaceCount =
        document.getElementById("characterNoSpaceCount");

    const lineCount =
        document.getElementById("lineCount");

    if (wordCount) {
        wordCount.textContent = words.length;
    }

    if (characterCount) {
        characterCount.textContent = text.length;
    }

    if (noSpaceCount) {
        noSpaceCount.textContent =
            text.replace(/\s/g, "").length;
    }

    if (lineCount) {
        lineCount.textContent = lines;
    }
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
        >

        <div
            id="countdownResult"
            class="countdown-result"
        >
            Select a date to start the countdown.
        </div>
        `
    );

    const dateInput =
        modal.querySelector("#examDateInput");

    dateInput.addEventListener(
        "change",
        updateExamCountdown
    );
}


let examCountdownTimer = null;


function updateExamCountdown() {

    const input =
        document.getElementById("examDateInput");

    const result =
        document.getElementById("countdownResult");

    if (!input || !result) return;

    if (!input.value) {
        return;
    }

    if (examCountdownTimer) {
        clearInterval(examCountdownTimer);
    }

    function update() {

        const target =
            new Date(input.value + "T00:00:00");

        const now = new Date();

        const difference =
            target.getTime() - now.getTime();

        if (difference <= 0) {

            result.textContent =
                "Your exam date has arrived! 🎯";

            clearInterval(examCountdownTimer);

            return;
        }

        const days =
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );

        const minutes =
            Math.floor(
                (difference / (1000 * 60)) % 60
            );

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );

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
        setInterval(update, 1000);
}


/* =========================================================
   PDF TOOLS
   ========================================================= */

function openPDFTools() {

    const modal = createModal(
        "PDF Tools",
        `
        <p>
            Select a PDF file to view basic file information.
        </p>

        <input
            type="file"
            id="pdfInput"
            accept="application/pdf"
        >

        <div
            id="pdfInfo"
            class="tool-result"
        >
            No PDF selected.
        </div>
        `
    );

    const input =
        modal.querySelector("#pdfInput");

    input.addEventListener("change", function () {

        const file = this.files[0];

        const info =
            modal.querySelector("#pdfInfo");

        if (!file) {
            info.textContent = "No PDF selected.";
            return;
        }

        const size =
            formatFileSize(file.size);

        info.innerHTML = `
            <strong>File:</strong> ${escapeHTML(file.name)}<br>
            <strong>Size:</strong> ${size}<br>
            <strong>Type:</strong> PDF
        `;
    });
}


/* =========================================================
   IMAGE COMPRESSOR
   ========================================================= */

function openImageCompressor() {

    const modal = createModal(
        "Image Compressor",
        `
        <p>
            Choose an image and select the quality level.
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
        `
    );

    const input =
        modal.querySelector("#imageInput");

    const quality =
        modal.querySelector("#imageQuality");

    const qualityValue =
        modal.querySelector("#qualityValue");

    const compressButton =
        modal.querySelector("#compressImageButton");

    quality.addEventListener("input", function () {

        qualityValue.textContent =
            this.value + "%";
    });

    input.addEventListener("change", function () {

        const file = this.files[0];

        const info =
            modal.querySelector("#imageInfo");

        if (!file) {
            info.textContent = "No image selected.";
            return;
        }

        info.innerHTML = `
            <strong>File:</strong> ${escapeHTML(file.name)}<br>
            <strong>Original size:</strong>
            ${formatFileSize(file.size)}
        `;
    });

    compressButton.addEventListener(
        "click",
        function () {

            const file = input.files[0];

            if (!file) {
                alert("Please select an image first.");
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


function compressImage(file, quality, modal) {

    const reader = new FileReader();

    reader.onload = function (event) {

        const image = new Image();

        image.onload = function () {

            const canvas =
                document.createElement("canvas");

            const maxWidth = 1600;
            const maxHeight = 1600;

            let width = image.width;
            let height = image.height;

            if (width > maxWidth) {

                height =
                    Math.round(
                        height * (maxWidth / width)
                    );

                width = maxWidth;
            }

            if (height > maxHeight) {

                width =
                    Math.round(
                        width * (maxHeight / height)
                    );

                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            const context =
                canvas.getContext("2d");

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
                        alert(
                            "Compression failed. Please try another image."
                        );
                        return;
                    }

                    const url =
                        URL.createObjectURL(blob);

                    const download =
                        modal.querySelector(
                            "#compressedDownload"
                        );

                    const info =
                        modal.querySelector(
                            "#imageInfo"
                        );

                    download.href = url;

                    download.style.display =
                        "inline-block";

                    download.textContent =
                        "⬇ Download Compressed Image";

                    info.innerHTML += `
                        <br>
                        <strong>Compressed size:</strong>
                        ${formatFileSize(blob.size)}
                    `;
                },
                "image/jpeg",
                quality / 100
            );
        };

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const index =
        Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

    return (
        parseFloat(
            (bytes / Math.pow(1024, index)).toFixed(2)
        )
        + " "
        + units[index]
    );
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener("error", function (event) {

    console.warn(
        "StudentKit error:",
        event.message
    );
});


/* =========================================================
   EXPORT FUNCTIONS FOR HTML onclick ATTRIBUTES
   ========================================================= */

window.toggleMenu = toggleMenu;
window.calculatePercentage = calculatePercentage;
window.copyPercentage = copyPercentage;
window.openScientificCalculator = openScientificCalculator;
window.openWordCounter = openWordCounter;
window.openExamCountdown = openExamCountdown;
window.openPDFTools = openPDFTools;
window.openImageCompressor = openImageCompressor;


/* =========================================================
   STUDENTKIT INITIALIZED
   ========================================================= */

console.log(
    "StudentKit India — All tools initialized successfully."
);
