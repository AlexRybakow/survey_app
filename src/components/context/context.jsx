import React, { useState } from 'react'

// interface ContextProps {
//     store: any,
//     chosen?: string[];
//   }

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
    const [chosen, setChosen] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [mode, setMode] = useState("light")
  
    const store = {
    chosen: [chosen, setChosen],
    currentQuestion:[currentQuestion, setCurrentQuestion],
    mode: [mode, setMode],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}