// ...existing code...
// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Enter valid details");
  }
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// START QUIZ
function startQuiz() {
  let topic = document.getElementById("topic").value;
  localStorage.setItem("topic", topic);
  window.location.href = "quiz.html";
}

// QUIZ DATA (two questions)
let questions = [
  {
    q: "What is Java?",
    A: "Programming Language",
    B: "Animal",
    C: "Car",
    D: "Food",
    answer: "A"
  },
  {
    q: "What is Python?",
    A: "Snake",
    B: "Programming Language",
    C: "Game",
    D: "OS",
    answer: "B"
  }
];

let current = 0;
let score = 0;

// LOAD QUESTION (only when on quiz page)
if (window.location.pathname.includes("quiz.html")) {
  const quizTitle = document.getElementById("quizTitle");
  if (quizTitle) quizTitle.innerText = "Quiz on " + (localStorage.getItem("topic") || "General");
  loadQuestion();
}

function loadQuestion() {
  if (current >= questions.length) return;
  let q = questions[current];
  const el = id => document.getElementById(id);
  if (el("question")) el("question").innerText = q.q;
  if (el("optA")) el("optA").innerText = q.A;
  if (el("optB")) el("optB").innerText = q.B;
  if (el("optC")) el("optC").innerText = q.C;
  if (el("optD")) el("optD").innerText = q.D;
}

// ANSWER
function answer(option) {
  if (option === questions[current].answer) {
    score++;
    const r = document.getElementById("result");
    if (r) r.innerText = "Correct!";
  } else {
    const r = document.getElementById("result");
    if (r) r.innerText = "Wrong! Correct answer is " + questions[current].answer;
  }

  current++;

  if (current < questions.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}

// RESULT PAGE
if (window.location.pathname.includes("result.html")) {
  const s = document.getElementById("score");
  if (s) s.innerText = "Your Score: " + localStorage.getItem("score");
}

// BACK TO DASHBOARD
function goDashboard() {
  window.location.href = "dashboard.html";
}
// ...existing code...