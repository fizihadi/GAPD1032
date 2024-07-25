const highScoresBtn = document.getElementById("highScoresBtn");
const saveScoreBtn = document.getElementById("saveScoreBtn");

//INPUT
const usernameInput = document.getElementById("username");

//PAGE
const pages = Array.from(document.getElementsByClassName("page"));

//GAME Elements
const question = document.getElementById("question");
const gambar = document.getElementById("question-image");
const choices = Array.from(document.getElementsByClassName("choice"));
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
const BASE_URL = window.location.origin

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//TODO: load form json file


let questions = [
  {
    question: "What is the definition of digital addiction?",
    gambar: `image/soalan1.png`,
    choice1: "A physical dependency on digital devices ",
    choice2: "A behavioral disorder characterized by excessive or poorly controlled preoccupations, urges, or behaviors related to computer use and Internet access, leading to impairment or distress",
    choice3: "A temporary interest in digital technology",
    choice4: "An addiction to all forms of media",
    answer: [2]
  },
  {
    question: "What is a common symptom of digital addiction?",
    gambar: `image/MPP.png`,
    choice1: "Improved social communication skills",
    choice2: "Loss of social communication interest",
    choice3: "Increased physical activity",
    choice4: "Better time management",
    answer: [2]
  },
  {
    question: "What is one type of digital addiction?",
    gambar: `image/soalan2.png`,
    choice1: "Food addiction",
    choice2: "Gambling addiction",
    choice3: "Social media addiction",
    choice4: "Exercise addiction",
    answer: [3]
  },
  {
    question: "What is one of the factors of digital addiction?",
    gambar: `image/malayanUnion2.png`,
    choice1: "Healthy family environment",
    choice2: "Balanced diet",
    choice3: "Dysfunctional family",
    choice4: "Regular exercise",
    answer: [3]
  },
  {
    question: "How can we treat digital addiction?",
    gambar: `image/Malayan3.png`,
    choice1: "Ignoring the problem",
    choice2: " Increasing screen time",
    choice3: "Cognitive Behavioral Therapy",
    choice4: "Eliminating all digital devices",
    answer: [3]
  }
];

//End Screen Elements
const finalScore = document.getElementById("finalScore");

//High Score Elements
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Simulated Navigation
navigateTo = pageName => {
  pages.forEach(page => {
    if (page.id === pageName) {
      page.classList.remove("hidden");
    } else {
      page.classList.add("hidden");
    }
  });
};

//GAME Functions

playGame = () => {
  startGame();
  navigateTo("game");
};

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    //set final score text
    finalScore.innerHTML = score;
    gambar.src = ''
    const finalScoreMsg = document.getElementById('msg')
    if (score === 50){
      finalScoreMsg.innerHTML = 'Hebat!'
    }else if (score === 40) {
      finalScoreMsg.innerHTML = "Terbaik! Teruskan Usaha"
    }else if (score === 30) {
      finalScoreMsg.innerHTML = "Cubaan yang baik"
    }else if (score === 20) {
      finalScoreMsg.innerHTML = "Kurang memuaskan"
    }else if (score === 10) {
      finalScoreMsg.innerHTML = "Cuba lagi"
    }
    else {
      finalScoreMsg.innerHTML = "Perlu penambahbaikan"
    }
    //Go to the end page
    return navigateTo("end");
  }
  questionCounter++;
  questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  // Display the image
  gambar.src = currentQuestion.gambar; // Assuming "gambar" is the ID of the image element

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  //Remove question from available questions
  availableQuestions.splice(questionIndex, 1);

  //let users answer now that question is ready
  acceptingAnswers = true;
};


choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

    const isCorrect = currentQuestion.answer.includes(selectedAnswer);
    const classToApply = isCorrect ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    incrementScore(isCorrect ? CORRECT_BONUS : 0);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


incrementScore = num => {
  score += num;
  scoreText.innerHTML = "Score: " + score;
};

//HIGH SCORES

showHighScores = () => {
  highScoresList.innerHTML = highScores
    .map(
      highScore =>
        `<li class="high-score">${highScore.username} - ${highScore.score}</li>`
    )
    .join("");
  navigateTo("highScores");
};