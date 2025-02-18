import React, { createContext, useContext, useState, useCallback } from 'react'

type Tab = 'reminders' | 'medication' | 'hcp'

export interface AppointmentReminder {
  id: string
  time: string
  type: 'appointment'
  duration: string
}

export interface MedicationReminder {
  id: string
  time: string
  type: 'medication'
  dosage: string
}

// type Reminder = MedicationReminder | AppointmentReminder

interface Medication {
  id: string
  name: string
  description?: string
  reminders: MedicationReminder[]
}

interface Practitioner {
  id: string
  name: string
  specialty: string
  reminders: AppointmentReminder[]
}

interface AppState {
  tab: Tab
  drawerOpen: boolean
  drawerObject:
    | (MedicationReminder & { name: string })
    | (AppointmentReminder & { name: string })
    | Medication
    | Practitioner
    | null
  medications: Medication[]
  practitioners: Practitioner[]
}

const generateId = () => Math.random().toString(36).substring(2, 9)

const initialState: AppState = {
  tab: 'reminders',
  drawerOpen: false,
  drawerObject: null,
  medications: [
    {
      id: generateId(),
      name: 'Oxycotin',
      description: 'Pain medication',
      reminders: [
        {
          id: generateId(),
          time: '10:00 AM',
          type: 'medication',
          dosage: '1 pill',
        },
        {
          id: generateId(),
          time: '4:00 PM',
          type: 'medication',
          dosage: '1 pill',
        },
      ],
    },
    {
      id: generateId(),
      name: 'Aspirin',
      description: 'Pain reliever and blood thinner',
      reminders: [
        {
          id: generateId(),
          time: '12:00 PM',
          type: 'medication',
          dosage: '2 pills',
        },
      ],
    },
    {
      id: generateId(),
      name: 'Lipitor',
      description: 'Cholesterol medication',
      reminders: [
        {
          id: generateId(),
          time: '2:00 PM',
          type: 'medication',
          dosage: '1 pill',
        },
      ],
    },
  ],
  practitioners: [
    {
      id: generateId(),
      name: 'Dr. Smith',
      specialty: 'Cardiologist',
      reminders: [
        {
          id: generateId(),
          time: '10:00 AM',
          type: 'appointment',
          duration: '30 minutes',
        },
        {
          id: generateId(),
          time: '2:00 PM',
          type: 'appointment',
          duration: '30 minutes',
        },
        {
          id: generateId(),
          time: '4:00 PM',
          type: 'appointment',
          duration: '30 minutes',
        },
      ],
    },
  ],
}

interface AppContextValue {
  state: AppState
  changeTab: (tab: Tab) => void
  setDrawerOpen: (open: boolean) => void
  setDrawerObject: (
    object:
      | (MedicationReminder & { name: string })
      | (AppointmentReminder & { name: string })
      | Medication
      | Practitioner
      | null
  ) => void
  groupReminders: () => {
    time: string
    items: (
      | (MedicationReminder & { name: string })
      | (AppointmentReminder & { name: string })
    )[]
  }[]
  addMedication: (medication: Omit<Medication, 'id' | 'reminders'>) => string
  updateMedication: (
    id: string,
    medication: Partial<Omit<Medication, 'id' | 'reminders'>>
  ) => void
  deleteMedication: (id: string) => void
  addMedicationReminder: (
    medicationId: string,
    reminder: Omit<MedicationReminder, 'id' | 'type'>
  ) => string
  updateMedicationReminder: (
    medicationId: string,
    reminderId: string,
    reminder: Partial<Omit<MedicationReminder, 'id' | 'type'>>
  ) => void
  deleteMedicationReminder: (medicationId: string, reminderId: string) => void
}

const AppStateContext = createContext<AppContextValue>({
  state: initialState,
  changeTab: () => {},
  setDrawerOpen: () => {},
  setDrawerObject: () => {},
  groupReminders: () => [],
  addMedication: () => '',
  updateMedication: () => {},
  deleteMedication: () => {},
  addMedicationReminder: () => '',
  updateMedicationReminder: () => {},
  deleteMedicationReminder: () => {},
})

interface AppStateProviderProps {
  children: React.ReactNode
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, setState] = useState<AppState>(initialState)

  const changeTab = useCallback((tab: Tab) => {
    setState((prevState) => ({
      ...prevState,
      tab,
    }))
  }, [])

  const setDrawerOpen = useCallback((open: boolean) => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: open,
    }))
  }, [])

  const setDrawerObject = useCallback(
    (
      object:
        | (MedicationReminder & { name: string })
        | (AppointmentReminder & { name: string })
        | Medication
        | Practitioner
        | null
    ) => {
      setState((prevState) => ({
        ...prevState,
        drawerObject: object,
      }))
    },
    []
  )

  const groupReminders = useCallback(() => {
    const appointmentReminders: Array<AppointmentReminder & { name: string }> =
      state.practitioners.flatMap((practitioner) =>
        practitioner.reminders.map((reminder: AppointmentReminder) => ({
          ...reminder,
          name: practitioner.name,
        }))
      )

    const medicationReminders: Array<MedicationReminder & { name: string }> =
      state.medications.flatMap((med) =>
        med.reminders.map((reminder: MedicationReminder) => ({
          ...reminder,
          name: med.name,
        }))
      )

    const allReminders: (
      | (MedicationReminder & { name: string })
      | (AppointmentReminder & { name: string })
    )[] = [...appointmentReminders, ...medicationReminders]

    const grouped: Record<
      string,
      (
        | (MedicationReminder & { name: string })
        | (AppointmentReminder & { name: string })
      )[]
    > = {}

    allReminders.forEach((reminder) => {
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
  }, [state.medications, state.practitioners])

  const addMedication = useCallback(
    (medication: Omit<Medication, 'id' | 'reminders'>) => {
      const id = generateId()
      setState((prevState) => ({
        ...prevState,
        medications: [
          ...prevState.medications,
          {
            ...medication,
            id,
            reminders: [],
          },
        ],
      }))
      return id
    },
    []
  )

  const updateMedication = useCallback(
    (id: string, medication: Partial<Omit<Medication, 'id' | 'reminders'>>) => {
      setState((prevState) => ({
        ...prevState,
        medications: prevState.medications.map((med) =>
          med.id === id ? { ...med, ...medication } : med
        ),
      }))
    },
    []
  )

  const deleteMedication = useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      medications: prevState.medications.filter((med) => med.id !== id),
    }))
  }, [])

  const addMedicationReminder = useCallback(
    (
      medicationId: string,
      reminder: Omit<MedicationReminder, 'id' | 'type'>
    ) => {
      const id = generateId()
      setState((prevState) => ({
        ...prevState,
        medications: prevState.medications.map((med) =>
          med.id === medicationId
            ? {
                ...med,
                reminders: [
                  ...med.reminders,
                  { ...reminder, id, type: 'medication' },
                ],
              }
            : med
        ),
      }))
      return id
    },
    []
  )

  const updateMedicationReminder = useCallback(
    (
      medicationId: string,
      reminderId: string,
      reminder: Partial<Omit<MedicationReminder, 'id' | 'type'>>
    ) => {
      setState((prevState) => ({
        ...prevState,
        medications: prevState.medications.map((med) =>
          med.id === medicationId
            ? {
                ...med,
                reminders: med.reminders.map((rem) =>
                  rem.id === reminderId ? { ...rem, ...reminder } : rem
                ),
              }
            : med
        ),
      }))
    },
    []
  )

  const deleteMedicationReminder = useCallback(
    (medicationId: string, reminderId: string) => {
      setState((prevState) => ({
        ...prevState,
        medications: prevState.medications.map((med) =>
          med.id === medicationId
            ? {
                ...med,
                reminders: med.reminders.filter((rem) => rem.id !== reminderId),
              }
            : med
        ),
      }))
    },
    []
  )

  const value = {
    state,
    changeTab,
    setDrawerOpen,
    setDrawerObject,
    groupReminders,
    addMedication,
    updateMedication,
    deleteMedication,
    addMedicationReminder,
    updateMedicationReminder,
    deleteMedicationReminder,
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
