import React, { createContext, useContext, useState, useCallback } from 'react'

type Tab = 'reminders' | 'medication' | 'hcp'
interface AppState {
  tab: Tab
}

const initialState: AppState = {
  tab: 'reminders',
}

const AppStateContext = createContext({
  state: initialState,
  changeTab: (tab: Tab) => {},
})

interface AppStateProviderProps {
  children: React.ReactNode
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, setState] = useState<AppState>(initialState)

  const changeTab = useCallback((tab: 'reminders' | 'medication' | 'hcp') => {
    setState((prevState) => ({
      ...prevState,
      tab,
    }))
  }, [])

  const value = {
    state,
    changeTab,
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
