function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "72px";
        nav.style.right = "4%";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.borderRadius = "12px";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)";
    }
}


/* PERCENTAGE CALCULATOR */

function calculatePercentage() {

    const obtained =
        parseFloat(document.getElementById("obtainedMarks").value);

    const total =
        parseFloat(document.getElementById("totalMarks").value);

    const message =
        document.getElementById("calculatorMessage");

    const resultBox =
        document.getElementById("resultBox");

    const result =
        document.getElementById("percentageResult");


    message.textContent = "";

    if (isNaN(obtained) || isNaN(total)) {

        resultBox.style.display = "none";

        message.textContent =
            "Please enter both marks.";

        return;
    }


    if (total <= 0) {

        resultBox.style.display = "none";

        message.textContent =
            "Total marks must be greater than 0.";

        return;
    }


    if (obtained < 0) {

        resultBox.style.display = "none";

        message.textContent =
            "Marks cannot be negative.";

        return;
    }


    if (obtained > total) {

        resultBox.style.display = "none";

        message.textContent =
            "Obtained marks cannot be greater than total marks.";

        return;
    }


    const percentage =
        (obtained / total) * 100;


    result.textContent =
        percentage.toFixed(2) + "%";


    resultBox.style.display = "block";

    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* COPY RESULT */

function copyPercentage() {

    const result =
        document.getElementById("percentageResult").textContent;

    navigator.clipboard.writeText(result)
        .then(() => {

            alert("Percentage copied: " + result);

        })
        .catch(() => {

            alert("Your percentage is " + result);

        });
}
