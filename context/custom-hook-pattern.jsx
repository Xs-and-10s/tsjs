// color-mode.js
import React, { useContext, useState } from 'react'

const ColorModeContext = React.createContext()

export const ColorModeProvider ({ children }) => {
  const [colorMode, setColorMode] = useState('light')

  return (
    <ColorModeContext.Provider value={{ colorMode, update: setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const { colorMode, update } = useContext(ColorModeContext)
  return { colorMode, update }
}
