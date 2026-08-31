/* =========================================
   StudentKit India — Main JavaScript
   ========================================= */

/* ---------- Mobile Menu ---------- */

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");

    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}


/* Close mobile menu after clicking a link */

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const menu = document.querySelector(".nav-links");

            if (menu) {
                menu.classList.remove("active");
            }
        });
    });
});


/* ---------- Percentage Calculator ---------- */

function calculatePercentage() {
    const obtainedInput = document.getElementById("obtainedMarks");
    const totalInput = document.getElementById("totalMarks");
    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("percentageResult");
    const message = document.getElementById("calculatorMessage");

    if (!obtainedInput || !totalInput || !result) {
        return;
    }

    const obtained = parseFloat(obtainedInput.value);
    const total = parseFloat(totalInput.value);

    if (message) {
        message.textContent = "";
    }

    if (isNaN(obtained) || isNaN(total)) {
        if (message) {
            message.textContent = "Please enter both marks.";
        }
        return;
    }

    if (total <= 0) {
        if (message) {
            message.textContent = "Total marks must be greater than 0.";
        }
        return;
    }

    if (obtained < 0) {
        if (message) {
            message.textContent = "Obtained marks cannot be negative.";
        }
        return;
    }

    if (obtained > total) {
        if (message) {
            message.textContent =
                "Obtained marks cannot be greater than total marks.";
        }
        return;
    }

    const percentage = (obtained / total) * 100;

    result.textContent = percentage.toFixed(2) + "%";

    if (resultBox) {
        resultBox.classList.add("show");
    }
}


/* ---------- Copy Percentage Result ---------- */

function copyPercentage() {
    const result = document.getElementById("percentageResult");

    if (!result) {
        return;
    }

    const text = result.textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(function () {
                showCopyMessage("Percentage copied!");
            })
            .catch(function () {
                fallbackCopy(text);
            });
    } else {
        fallbackCopy(text);
    }
}


/* Fallback copy method */

function fallbackCopy(text) {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.select();

    try {
        document.execCommand("copy");
        showCopyMessage("Percentage copied!");
    } catch (error) {
        showCopyMessage("Copy failed. Please copy manually.");
    }

    document.body.removeChild(textarea);
}


/* Copy notification */

function showCopyMessage(text) {
    const message = document.getElementById("calculatorMessage");

    if (!message) {
        return;
    }

    message.textContent = text;

    setTimeout(function () {
        message.textContent = "";
    }, 2000);
}


/* ---------- Enter Key for Calculator ---------- */

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const activeElement = document.activeElement;

        if (
            activeElement &&
            (
                activeElement.id === "obtainedMarks" ||
                activeElement.id === "totalMarks"
            )
        ) {
            calculatePercentage();
        }
    }
});


/* ---------- Smooth Scrolling ---------- */

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
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
});


/* ---------- Number Input Protection ---------- */

document.addEventListener("DOMContentLoaded", function () {
    const numberInputs = document.querySelectorAll(
        'input[type="number"]'
    );

    numberInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});


/* ---------- Simple Page Ready ---------- */

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("page-loaded");
});
