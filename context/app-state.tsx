import React, { createContext, useContext, useState, useCallback } from 'react'

type Tab = 'reminders' | 'medication' | 'hcp'

interface MedicationReminder {
  time: string
  name: string
  type: 'medication'
  dosage: string
}

interface AppointmentReminder {
  time: string
  name: string
  type: 'appointment'
  duration: string
}

type Reminder = MedicationReminder | AppointmentReminder

interface AppState {
  tab: Tab
  reminders: Reminder[]
}

const initialState: AppState = {
  tab: 'reminders',
  reminders: [
    {
      time: '10:00 AM',
      type: 'medication',
      name: 'Oxycotin',
      dosage: '1 pill',
    },
    {
      time: '10:00 AM',
      type: 'appointment',
      name: 'Dr. Smith',
      duration: '30 minutes',
    },
  ],
}

const AppStateContext = createContext({
  state: initialState,
  changeTab: (tab: Tab) => {},
  groupReminders: (): { time: string; items: Reminder[] }[] => [],
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

  const groupReminders = useCallback(() => {
    const grouped: Record<string, Reminder[]> = {}

    state.reminders.forEach((reminder) => {
      if (!grouped[reminder.time]) {
        grouped[reminder.time] = []
      }
      grouped[reminder.time].push(reminder)
    })

    const result = Object.entries(grouped).map(([time, reminders]) => ({
      time,
      items: reminders,
    }))

    result.sort((a, b) => {
      return a.time.localeCompare(b.time)
    })

    return result
  }, [state.reminders])

  const value = {
    state,
    changeTab,
    groupReminders,
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
