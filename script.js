const projects = [
    { name: "Website design", client: "Amazon", budget: "$2,500", status: "In Progress" },
    { name: "Game development", client: "Epic Games", budget: "$4,000", status: "Completed" },
    { name: "Logo design", client: "Apple inc", budget: "$1,800", status: "Pending" }
];

function renderProjects() {
    const container = document.getElementById("projectsContainer");
    let Prjct = "";

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        Prjct += `
            <div class="ProjectCard">
                <h3>${project.name}</h3>
                <p>Client: ${project.client}</p>
                <p>Budget: ${project.budget}</p>
                <span class="status-tag">${project.status}</span>
            </div>
        `;
    }

    container.innerHTML = Prjct;
}

renderProjects();


const themeToggleBtn = document.getElementById("themeToggleBtn");

themeToggleBtn.addEventListener("click",() => {
    document.body.classList.toggle("darktheme");

    if (document.body.classList.contains("darktheme")) {
        themeToggleBtn.textContent = "☀️ Toggle Light Mode";
    } else {
        themeToggleBtn.textContent = "🌙 Toggle Dark Mode";
    }
});

const cardColorInput = document.getElementById("cardColorInput");
const targetCard = document.getElementById("advicecard");

cardColorInput.addEventListener("input", () => {
    targetCard.style.backgroundColor = cardColorInput.value;
});


async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    const adviceText = document.getElementById("adviceText");
    adviceText.textContent = data.slip.advice;  
}

getAdvice();

const getAdviceBtn = document.getElementById("getAdviceBtn");
getAdviceBtn.addEventListener("click", getAdvice);

const form = document.getElementById("intakeFormElement");
const errorMsg = document.getElementById("formMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameInput = document.getElementById("clientName");
    const emailInput = document.getElementById("clientEmail");
    const descInput = document.getElementById("projectDesc");

    let isValid = true;

    if (nameInput.value.trim() === "") {
        nameInput.style.borderColor = "red";
        isValid = false;
    } else {
        nameInput.style.borderColor = "green";
    }

    if (!emailInput.value.trim().toLowerCase().endsWith("@gmail.com") && !emailInput.value.trim().toLowerCase().endsWith("@yahoo.com")) {
        emailInput.style.borderColor = "red";
        isValid = false;
    } else {
        emailInput.style.borderColor = "green";
    }
    if(descInput.value.trim() === ""){
        descInput.style.borderColor = "red"
        isValid =false;
    }
    else{
        descInput.style.borderColor = "green"
    }

    if (isValid) {
        errorMsg.textContent = "Project submitted successfully!";
        errorMsg.style.color = "green";
    }
    else{
        errorMsg.textContent = "Project could not be submitted! check your inputs";
        errorMsg.style.color = "red";

    }
});
let description = descInput.value.trim();
if (description.toLowerCase().includes("cheap")) {
    description = description.replace("cheap", "****");
}