import React, { createContext, useContext, useState, useCallback } from 'react'
import { DEFAULT_APP_STATE, generateId } from './default-state'

type Tab = 'reminders' | 'medication' | 'hcp'

export interface AppointmentReminder {
  id: string
  time: string
  type: 'appointment'
  duration: string
  taken: boolean
}

export interface MedicationReminder {
  id: string
  time: string
  type: 'medication'
  dosage: string
  taken: boolean
}

// type Reminder = MedicationReminder | AppointmentReminder

export interface Medication {
  id: string
  name: string
  description?: string
  reminders: MedicationReminder[]
}

export interface Practitioner {
  id: string
  name: string
  specialty: string
  reminders: AppointmentReminder[]
}

export interface Profile {
  id: 'profile'
  name: string
  email: string
  fontSize: number
  colorBlind: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  notificationPreference: 'email' | 'push' | 'sms' | 'in-app'
  hideNotificationDetails: boolean
}

export interface AppState {
  profile: Profile
  tab: Tab
  stackObject: Medication | Practitioner | Profile | 'stats' | null
  drawerObject:
    | (MedicationReminder & { name: string })
    | (AppointmentReminder & { name: string })
    | Medication
    | Practitioner
    | null
  medications: Medication[]
  practitioners: Practitioner[]
  addMenuOpen: boolean
}

interface AppContextValue {
  state: AppState
  changeTab: (tab: Tab) => void
  setStackObject: (
    object: Medication | Practitioner | Profile | 'stats' | null
  ) => void
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
    reminderId: string,
    reminder: Partial<Omit<MedicationReminder, 'id' | 'type'>>
  ) => void
  deleteMedicationReminder: (medicationId: string, reminderId: string) => void
  setAddMenuOpen: (isOpen: boolean) => void
}

const AppStateContext = createContext<AppContextValue>({
  state: DEFAULT_APP_STATE,
  changeTab: () => {},
  setStackObject: () => {},
  setDrawerObject: () => {},
  groupReminders: () => [],
  addMedication: () => '',
  updateMedication: () => {},
  deleteMedication: () => {},
  addMedicationReminder: () => '',
  updateMedicationReminder: () => {},
  deleteMedicationReminder: () => {},
  setAddMenuOpen: () => {},
})

interface AppStateProviderProps {
  children: React.ReactNode
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, setState] = useState<AppState>(DEFAULT_APP_STATE)

  const changeTab = useCallback((tab: Tab) => {
    setState((prevState) => ({
      ...prevState,
      tab,
    }))
  }, [])

  const setStackObject = useCallback(
    (object: Medication | Practitioner | Profile | 'stats' | null) => {
      setState((prevState) => ({
        ...prevState,
        stackObject: object,
      }))
    },
    []
  )

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
      setState((prevState) => {
        const staleMedication = prevState.medications.find(
          (med) => med.id === id
        )
        if (!staleMedication) return prevState
        // let updateStackObject = state.stackObject && state.stackObject.id === id
        return {
          ...prevState,
          stackObject: medication
            ? { ...staleMedication, ...medication }
            : prevState.stackObject,
          medications: prevState.medications.map((med) =>
            med.id === id ? { ...med, ...medication } : med
          ),
        }
      })
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
      reminderId: string,
      reminder: Partial<Omit<MedicationReminder, 'id' | 'type'>>
    ) => {
      setState((prevState) => {
        const medication = prevState.medications.find((med) =>
          med.reminders.find((rem) => rem.id === reminderId)
        )
        if (!medication) return prevState

        const staleReminder = medication.reminders.find(
          (rem) => rem.id === reminderId
        )
        if (!staleReminder) return prevState
        const updatedReminder = { ...staleReminder, ...reminder }

        let d = false
        if (
          prevState.drawerObject &&
          'id' in prevState.drawerObject &&
          prevState.drawerObject.id === reminderId
        ) {
          d = true
        } else {
        }

        return {
          ...prevState,
          drawerObject: d
            ? { ...updatedReminder, name: medication.name }
            : prevState.drawerObject,
          medications: prevState.medications.map((med) => {
            if (med.id !== medication.id) return med
            return {
              ...med,
              reminders: med.reminders.map((rem) =>
                rem.id === reminderId ? updatedReminder : rem
              ),
            }
          }),
        }
      })
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

  const setAddMenuOpen = useCallback((isOpen: boolean) => {
    setState((prevState) => ({
      ...prevState,
      addMenuOpen: isOpen,
    }))
  }, [])

  const value = {
    state,
    changeTab,
    setStackObject,
    setDrawerObject,
    groupReminders,
    addMedication,
    updateMedication,
    deleteMedication,
    addMedicationReminder,
    updateMedicationReminder,
    deleteMedicationReminder,
    setAddMenuOpen,
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
