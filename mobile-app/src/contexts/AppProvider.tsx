import useColorScheme from '@/hooks/useColorScheme';
import { theme } from '@/utils/constants/Colors';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';

const AppContext = React.createContext({
  colorScheme: 'light' as "light" | "dark",
  setColorScheme: (colorScheme: any) => { },
  toggleColorScheme: () => { }
})

export const useApp = () => React.useContext(AppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme("light")

  const _colorScheme = colorScheme as "light" | "dark"
  return (
    <AppContext.Provider value={{ colorScheme: _colorScheme, setColorScheme, toggleColorScheme }}>
      <ApplicationProvider {...eva} theme={{ ...eva[colorScheme!], ...theme }}>
        {children}
      </ApplicationProvider>
    </AppContext.Provider>
  )
}

export default AppProvider