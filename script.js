let level = 1;
let experience = 0;
let skillPoints = 0;
let gold = 0;
let silver = 0;

const trainButton = document.getElementById("trainButton");
const levelDisplay = document.getElementById("level");
const experienceDisplay = document.getElementById("experience");
const skillPointsDisplay = document.getElementById("skillPoints");
const goldDisplay = document.getElementById("gold");
const silverDisplay = document.getElementById("silver");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");

trainButton.addEventListener("click", train);
saveButton.addEventListener("click", saveGame);
loadButton.addEventListener("click", loadGame);

// Interval for automatic training (every 2 seconds)
setInterval(train, 2000);

function train() {
  experience += 10;
  silver += 1;

  if (silver >= 100) {
    silverToGold();
  }

  if (experience >= 100) {
    levelUp();
  }

  updateStats();
}

function levelUp() {
  level++;
  experience = 0;
  skillPoints += 1;
}

function silverToGold() {
  const silverToConvert = Math.floor(silver / 100);
  gold += silverToConvert;
  silver -= silverToConvert * 100;
}

function updateStats() {
  levelDisplay.textContent = level;
  experienceDisplay.textContent = experience;
  skillPointsDisplay.textContent = skillPoints;
  goldDisplay.textContent = gold;
  silverDisplay.textContent = silver;
}

function saveGame() {
  const gameData = {
    level,
    experience,
    skillPoints,
    gold,
    silver,
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
  alert("Game saved!");
}

function loadGame() {
  const savedGameData = localStorage.getItem("gameData");
  if (savedGameData) {
    const gameData = JSON.parse(savedGameData);
    level = gameData.level;
    experience = gameData.experience;
    skillPoints = gameData.skillPoints;
    gold = gameData.gold;
    silver = gameData.silver;
    updateStats();
    alert("Game loaded!");
  } else {
    alert("No saved game found!");
  }
}
