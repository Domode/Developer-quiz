const body = document.getElementsByTagName('BODY')[0];
const startQuiz = document.querySelector('.start-quiz');
const quizElement = document.querySelector('.quiz');
const question = document.querySelector('.question');
const answerWrapper = document.querySelector('.answers');
const answers = document.querySelector('.answer');
let questionShuffle,
	currentQuestionIdx,
	score = 0;

// Adds new question with answers that each get an eventlistener
function newQuestion(quest) {
	question.innerHTML = quest.question;
	quest.answers.forEach((answer) => {
		const li = document.createElement('li');
		li.setAttribute('class', 'answer');
		li.innerHTML = answer.answer;
		if (answer.correct) {
			li.dataset.correct = answer.correct;
		}
		li.addEventListener('click', clickedAnswer);
		answerWrapper.appendChild(li);
	});
}

// Removes the current answers from the DOM
function removeAnswers() {
	answerWrapper.querySelectorAll('.answer').forEach((e) => e.remove());
}

// Removes answers and creates next question
function nextQuestion() {
	removeAnswers();
	newQuestion(questionShuffle[currentQuestionIdx]);
}

//
function clickedAnswer(e) {
	const clickedLi = e.target;
	Array.from(answerWrapper.children).forEach((li) => {
		addCorrectOrWrongClass(li, li.dataset.correct);
	});

	if (clickedLi.dataset.correct) {
		question.innerHTML = 'CORRECT!';
		score++;
	} else {
		question.innerHTML = 'WRONG!';
	}

	if (questionShuffle.length > currentQuestionIdx + 1) {
		currentQuestionIdx++;
		setTimeout(function() {
			nextQuestion();
		}, 1500);
	} else {
		setTimeout(function() {
			removeAnswers();
			question.classList.add('final-score');
			answerWrapper.style.padding = '0';
			question.innerHTML = `You Scored: ${score}`;
			body.classList.add('flex');
			startQuiz.innerHTML = 'Play Again';
			startQuiz.classList.remove('hide');
		}, 1500);
	}
}

function addCorrectOrWrongClass(e, correct) {
	if (correct) {
		e.classList.add('correct');
	} else {
		e.classList.add('wrong');
	}
}

function startQuizButton() {
	startQuiz.classList.add('hide');
	quizElement.style.display = 'flex';
	answerWrapper.style.padding = '1.25rem 2rem';
	question.classList.remove('final-score');
	questionShuffle = questions.sort(() => Math.random() - 0.5);
	currentQuestionIdx = 0;
	score = 0;
	nextQuestion();
}

startQuiz.addEventListener('click', startQuizButton);

const questions = [
	{
		question : 'What does HTML stand for?',
		answers  : [
			{ answer: 'Hyper Tag Markup Language', correct: false },
			{ answer: 'Hyper Text Markup Language', correct: true },
			{ answer: 'Hyperlinks Text Mark Language', correct: false },
			{ answer: 'Hyperlinking Text Marking Language', correct: false }
		]
	},
	{
		question : 'What does CSS stand for?',
		answers  : [
			{ answer: 'Computing Style Sheet', correct: false },
			{ answer: 'Creative Style System', correct: false },
			{ answer: 'Cascading Style Sheet', correct: true },
			{ answer: 'Creative Styling Sheet', correct: false }
		]
	},
	{
		question : 'Which is the correct CSS syntax?',
		answers  : [
			{ answer: 'Body {color: black}', correct: true },
			{ answer: '{body;color:black}', correct: false },
			{ answer: '{body:color=black(body}', correct: false },
			{ answer: 'body:color=black', correct: false }
		]
	},
	{
		question : 'What are the two methods of forms transfer?',
		answers  : [
			{ answer: 'Post and receive', correct: false },
			{ answer: 'Get and receive', correct: false },
			{ answer: 'Get and post', correct: true },
			{ answer: 'Post and take', correct: false }
		]
	},
	{
		question : 'Choose the correct HTML tag for the largest heading?',
		answers  : [
			{ answer: 'h1', correct: true },
			{ answer: 'heading', correct: false },
			{ answer: 'h6', correct: false },
			{ answer: 'head', correct: false }
		]
	}
];
