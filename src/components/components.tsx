import React, { useContext } from 'react';
import { StoreContext } from './context/context';
import { questions } from '../questions/questions';

export const Questions = () => {
	const { mode, setMode } = useContext(StoreContext)
    const { currentQuestion } = useContext(StoreContext);

	const changeMode = () => {
		mode === 'light' ? setMode("dark") : setMode("light")
	}
    return (
		<div>
		<button className='mode-button' onClick={() => changeMode()}>Switch mode</button>
		<div className='question-section'>
			<div className='question-count'>
				<h3>Question <span>{currentQuestion + 1}</span> /{questions.length}</h3>
			</div>
			<div data-testid="question-text" className='question-text'>{questions[currentQuestion].questionText}</div>
		</div>
		</div>
    )
}



