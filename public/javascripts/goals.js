async function fetchSDGGoals() {
  try {
    const response = await fetch('/sdg-goals.json'); 
    const data = await response.json();
    const goals = data.sdgs;
    displaySDGGoals(goals);
  } catch (error) {
    console.error("Error fetching SDG goals:", error);
    displayError();
  }
}

function displaySDGGoals(goals) {
  const goalsListElement = document.getElementById("articleContainer");
  goals.forEach((goal) => {
    const goalElement = document.createElement("div");
    goalElement.classList.add("article-card"); // Apply animation class
    goalElement.innerHTML = `
                <h2 class="text-xl font-semibold mb-2">${goal.title}</h2>
                <p class="text-gray-700">${goal.description}</p>
                <hr class="my-4 border-gray-200">
            `;
    goalsListElement.appendChild(goalElement);
  });
}

function displayError() {
  const goalsListElement = document.getElementById("articleContainer");
  goalsListElement.innerHTML =
    "<p>Error fetching SDG goals. Please try again later.</p>";
}

fetchSDGGoals();
