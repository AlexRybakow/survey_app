import React, { useState } from 'react';
import { questions } from './questions/questions';
import styled, { ThemeProvider } from 'styled-components';
import { light, dark, GlobalStyles } from './modes/modes';
import Message from './components/message/message';
// import { StoreContext } from './components/context/context';
// import { Questions } from './components/components';

const StyledApp = styled.div`
color: ${(props) => props.theme.fontColor}
`;

export default function App() {
	const [chosen, setChosen] = useState<Array<string>>([])
	const [mode, setMode] = useState<string>("light")
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [showAnswers, setShowAnswers] = useState<boolean>(false);
	const [answer, setAnswer] = useState<string>('')
	const [inputAnswer, setInputAnswer] = useState<boolean>(true)
	const [oneChoice, setOneChoice] = useState<boolean>(false)
	const [multipleChoice, setMultipleChoice] = useState<boolean>(false)
	const [picked, setPicked] = useState<Array<string>>([])
	const [message, setMessage] = useState<boolean>(false)

	const nextQuestion = currentQuestion + 1;

	const toNextQuestion = () => {
		if (nextQuestion <= questions.length && answer.trim().length !== 0) {
			setCurrentQuestion(nextQuestion);
			setAnswer('')
		} else {
			setMessage(true)
		}

		if (nextQuestion === questions.length && answer.trim().length !== 0) {
			setShowAnswers(true)

		}
	}

	const changeMode = () => {
		mode === 'light' ? setMode("dark") : setMode("light")
	}

	const onChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value)
	}

	const onChoiceAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
		const input = event.target as HTMLElement;
		setAnswer(input.innerText);
	}

	const pickedAnswer = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let addedItem = event.target.value;
		let pickedItems = picked;

		pickedItems.indexOf(addedItem) === -1
			? pickedItems.push(addedItem)
			: pickedItems.length === 1
				? (pickedItems = [])
				: pickedItems.splice(pickedItems.indexOf(addedItem), 1)

		setPicked(pickedItems)
		const pickedAnswers = picked.join();
		setAnswer(pickedAnswers)
	}

	const handleAnswerOptionClick = () => {
		toNextQuestion()

		if (inputAnswer && nextQuestion < questions.length && answer.trim().length !== 0) {
			setInputAnswer(false)
			setMultipleChoice(true)
			setMessage(false)
		} else if (multipleChoice && nextQuestion < questions.length && answer.trim().length !== 0) {
			setMultipleChoice(false)
			setOneChoice(true)
			setMessage(false)
		} else if (oneChoice && nextQuestion < questions.length && answer.trim().length !== 0) {
			setOneChoice(false)
			setInputAnswer(true)
			setMessage(false)
		}
		if (answer.trim().length !== 0) {
			setChosen([...chosen, answer])
		}
	};

	const ReturnToStart = () => {
		setCurrentQuestion(0)
	}
	return (
		<ThemeProvider theme={mode === 'light' ? light : dark}>
			<GlobalStyles />
			<StyledApp>
				<div data-testid="body" className='app'>
					{showAnswers ? (
						<form className='resume-section resume'>
							<div className='resume'>
								<h3 className='title'>Your answers are:</h3>
								<ul>
									{chosen.map((item: React.ReactNode, id: string | number) => (
										<li className='list' key={id}>{item}</li>
									))}
								</ul>
							</div>
							<button data-testid="return-button" onClick={() => ReturnToStart()}>Return</button>
						</form>
					) : (
								<div className='main-block'>
									<button className='mode-button' onClick={() => changeMode()}>Switch mode</button>
									<div className='question-section'>
										<div className='question-count'>
											<h3>Question <span>{currentQuestion + 1}</span> /{questions.length}</h3>
										</div>
										<div data-testid="question-text" className='question-text'>{questions[currentQuestion].questionText}</div>
									</div>
									{inputAnswer ? (
										<>
											<div className='answer-section'>
												<input type='text' className='user-input' placeholder="Write answer here" value={answer} onChange={onChangeAnswer} required
												/>
												<button id='button' data-testid="next-button" onClick={() => handleAnswerOptionClick()}>Next</button>
												{message ? <Message /> : null}
											</div>
										</>
									)
										: null}
									{multipleChoice ?
										(
											<>
												<div className='answer-section'>
													<select
														multiple={true}
														value={picked}
														onChange={pickedAnswer}
													>
														{questions[currentQuestion].answerOptions.map((answerOption) => (
															<option className='user-input' value={answerOption.answerText}>{answerOption.answerText}</option>
														))}
													</select>
													<button onClick={() => handleAnswerOptionClick()}>Next</button>
													{message ? <Message /> : null}
												</div>
											</>
										)
										: null}
									{oneChoice ? (
										<>
											<div className='answer-section'>
												{questions[currentQuestion].answerOptions.map((answerOption) => (
													<button onClick={(event) => onChoiceAnswer(event)}>{answerOption.answerText}</button>
												))}
												<button onClick={() => handleAnswerOptionClick()}>Next</button>
												{message ? <Message /> : null}
											</div>
										</>
									)
										: null}
								</div>
						)}
				</div>
			</StyledApp>
		</ThemeProvider>
	);
}
