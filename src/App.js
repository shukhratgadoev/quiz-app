import React, { useState, useEffect  } from 'react';
import classnames from 'classnames';

export default function App() {
	

	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [incorrect, setIncorrect] = useState(0);
	const [timeLeftScore, settimeLeftScore] = useState(0);

	const [prevButtonDisabled, setButtonDisabled] = useState(true);

	const [timeLeft, setTimeLeft] = useState(3);

	useEffect(() => {
		const interval = setInterval(() => {
		  setTimeLeft((prev) => prev - 1);
		}, 1000);
		
		return () => {
		  clearInterval(interval);
		};
		
	  }, []);


	const timeLeftNext = () => {
		if(timeLeft < 0 ){

			const nextQuestion = currentQuestion + 1;


			if (nextQuestion < questions.length) {
				setCurrentQuestion(nextQuestion);
				setTimeLeft(3) 
				
			} else {
				setShowScore(true);
			}
		}
	}

	useEffect(() => {
		timeLeftNext()
	})
	
	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}else{
			setIncorrect(incorrect + 1)
		}
		
	};
	
	const handleClickNext = () => {
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			if(currentQuestion !== 1){
				setButtonDisabled(false)
			}
		} else {
			setShowScore(true);
		}
	}

	const handleClickPrev = () => {
		const prevQuestion = currentQuestion - 1;

		if (prevQuestion < questions.length) {
			setCurrentQuestion(prevQuestion);

			if(prevQuestion === undefined || currentQuestion === 1){
				setButtonDisabled(true)
			}else{
				setButtonDisabled(false)
			}

		} else {
			setShowScore(true);
		}

	}

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					Your correct answer is {score} out of {questions.length}
					<br/>
					Your incorrect answer is {incorrect} out of {questions.length}
					<br/>
					Time left for next question {timeLeftScore} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						<p>{timeLeft}</p>

						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button 
							key={index} 
							className='answer-buttons'
							onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
							>
								{answerOption.answerText}
						  </button>
						))}
						
						 <div className='button-wrap'>
						 <button 
							className={classnames('next-button',{
								disable: prevButtonDisabled
							})}

							onClick={handleClickPrev}>Prev</button>
						<button 
							className='next-button prev-button'
							onClick={handleClickNext}>Next</button>
						</div>
					</div>
					
				</>
			)}
		</div>
	);
}