let score = 0;
let timer = 10;
let interval;

const questions = [
  {
    question: "Manakah yang merupakan energi terbarukan?",
    answers: ["Batu bara", "Minyak bumi", "Tenaga surya"],
    correct: 2
  },
  {
    question: "Apa dampak utama membuang sampah ke sungai?",
    answers: ["Sungai menjadi bersih", "Air menjadi tercemar", "Ikan bertambah banyak"],
    correct: 1
  },
  {
    question: "Sampah organik biasanya berasal dari…",
    answers: ["Sisa makanan", "Botol plastik", "Kardus"],
    correct: 0
  },
  {
    question: "Cara terbaik mengurangi sampah plastik adalah…",
    answers: ["Membakar plastik", "Menggunakan tas kain", "Membuang ke sungai"],
    correct: 1
  }
];

let currentQuestion = 0;


function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkAnswer(i);
    answersDiv.appendChild(btn);
  });

  // Reset timer tiap soal baru
  resetTimer();
}

function checkAnswer(i) {
  const q = questions[currentQuestion];
  const status = document.getElementById("status");

  if (i === q.correct) {
    score += 10;
    document.getElementById("score").innerText = score;
    status.innerText = "Benar!";
    status.className = "status correct";
  } else {
    status.innerText = "Salah!";
    status.className = "status wrong";
  }

  setTimeout(() => {
    status.innerText = "";
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      clearInterval(interval);
      document.getElementById("level1").classList.add("hidden");
      document.getElementById("next-level").classList.remove("hidden");
      document.getElementById("finalScore").innerText = score;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval); 
  timer = 10;
  document.getElementById("timer").innerText = timer;

  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;

    if (timer <= 0) {
      clearInterval(interval);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        document.getElementById("level1").classList.add("hidden");
        document.getElementById("next-level").classList.remove("hidden");
        document.getElementById("finalScore").innerText = score;
      }
    }
  }, 1000);
}


function startLevel2() {
  document.getElementById("next-level").classList.add("hidden");
  document.getElementById("level2").classList.remove("hidden");
}

function checkAnswer2(choice) {
  const status2 = document.getElementById("status2");

  if (choice === 1) { 
    score += 20;
    document.getElementById("score").innerText = score;
    status2.innerText = "Benar! 🎉";
    status2.className = "status correct";

    setTimeout(() => {
      finishGame();
    }, 1000);
  } else {
    status2.innerText = "Salah! 😅";
    status2.className = "status wrong";
  }
}

function endGame() {
  alert("Permainan selesai! Skor akhir: " + score);
  window.location.href = "../../views/index.html"; 
}
function finishGame() {
  document.getElementById("level2").classList.add("hidden");
  document.getElementById("game-over").classList.remove("hidden");

  document.getElementById("finalScoreEnd").textContent = score;
}

function restartGame() {
  score = 0;
  timer = 10;
  currentQuestion = 0;

  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timer;

  document.getElementById("game-over").classList.add("hidden");
  document.getElementById("level1").classList.remove("hidden");

  loadQuestion();
}

function exitGame() {
  alert("Terima kasih sudah bermain! 👋");
  window.location.href = "../../views/index.html"; 
}

window.onload = () => {
  loadQuestion();
};
