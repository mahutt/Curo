import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Medication } from '@/context/app-state'
import { Check, Minus, Pencil, X } from 'lucide-react'
import { useState } from 'react'

export default function StackMedicationBody({
  medication,
  updateMedication,
}: {
  medication: Medication
  updateMedication: (id: string, data: Partial<Medication>) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedName(medication.name)
    setEditedDescription(medication.description || '')
  }

  const handleSaveClick = () => {
    updateMedication(medication.id, {
      name: editedName,
      description: editedDescription,
    })
    setIsEditing(false)
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 pt-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-2xl tracking-tight"
            />
          ) : (
            <h1 className="text-2xl tracking-tight">{medication.name}</h1>
          )}
          {!isEditing && (
            <Button
              variant="ghost"
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </Button>
          )}
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-sm text-gray-500"
              placeholder="Add a description..."
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-500"
                onClick={handleSaveClick}
              >
                <Check className="h-4 w-4" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500">
            {medication.description || 'No description'}
          </div>
        )}
        <div className="mt-8 text-sm flex items-center gap-2">
          <div className="flex-1 border-gray-500 border-t h-1/2" />
          <div className="text-gray-500">Reminders for this medication</div>
          <div className="flex-1 border-gray-500 border-t h-1/2" />
        </div>
        <ReminderSettings />
      </div>
    </div>
  )
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Plus, Trash, Edit2 } from 'lucide-react'

function ReminderSettings() {
  const [frequency, setFrequency] = useState('everyday')
  const [timers, setTimers] = useState<{ id: number; time: string }[]>([
    { id: 1, time: '08:00' },
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedDays, setSelectedDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })
  const [daysInterval, setDaysInterval] = useState(1)

  const addTimer = () => {
    const newId =
      timers.length > 0 ? Math.max(...timers.map((t) => t.id)) + 1 : 1
    setTimers([...timers, { id: newId, time: '12:00' }])
  }

  const updateTimer = (id: number, time: string) => {
    setTimers(
      timers.map((timer) => (timer.id === id ? { ...timer, time } : timer))
    )
  }

  const deleteTimer = (id: number) => {
    setTimers(timers.filter((timer) => timer.id !== id))
  }

  const startEditing = (id: number) => {
    setEditingId(id)
  }

  const stopEditing = () => {
    setEditingId(null)
  }

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ]

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Frequency Selection */}
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select value={frequency} onValueChange={setFrequency}>
          <SelectTrigger id="frequency" className="w-full">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="everyday">Every day</SelectItem>
            <SelectItem value="specificDays">Specific days</SelectItem>
            <SelectItem value="daysInterval">Days interval</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Specific Days Selection */}
      {frequency === 'specificDays' && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              {days.map((day) => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.id}
                    checked={selectedDays[day.id as keyof typeof selectedDays]}
                    onCheckedChange={(checked) => {
                      setSelectedDays({ ...selectedDays, [day.id]: checked })
                    }}
                  />
                  <Label htmlFor={day.id}>{day.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Days Interval Selection */}
      {frequency === 'daysInterval' && (
        <div>
          <Label htmlFor="interval">
            Remind me every {daysInterval} day{daysInterval > 1 && 's'}.
          </Label>
          <div className="mt-2 flex justify-between items-center space-x-1">
            <Button
              variant="outline"
              className="px-6 rounded-full"
              onClick={() => setDaysInterval((prev) => Math.max(1, prev - 1))}
            >
              <Minus />
            </Button>
            <span id="interval" className="w-8 text-center">
              {daysInterval}
            </span>
            <Button
              variant="outline"
              className="px-6 rounded-full"
              onClick={() => setDaysInterval((prev) => Math.min(30, prev + 1))}
            >
              <Plus />
            </Button>
          </div>
        </div>
      )}

      {/* Timer Section */}
      {frequency !== 'none' && (
        <div className="space-y-2">
          <Label>
            {frequency === 'everyday'
              ? 'Remind me at these times:'
              : frequency === 'specificDays'
              ? 'Remind me at these times on the selected days:'
              : 'Remind me at these times every ' +
                daysInterval +
                ' day' +
                (daysInterval > 1 ? 's:' : ':')}
          </Label>

          <div className="space-y-2">
            {timers.map((timer) => (
              <div
                key={timer.id}
                className="flex items-center justify-between bg-secondary p-3 rounded-md"
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mx-2" />
                  {editingId === timer.id ? (
                    <input
                      type="time"
                      value={timer.time}
                      onChange={(e) => updateTimer(timer.id, e.target.value)}
                      autoFocus
                      className="w-28"
                    />
                  ) : (
                    <span>{timer.time}</span>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (editingId == timer.id) {
                        stopEditing()
                      } else {
                        startEditing(timer.id)
                      }
                    }}
                  >
                    {editingId == timer.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTimer(timer.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={addTimer} variant="secondary" className="w-full">
            <Plus className="h-4 w-4 mr-1" />
          </Button>
        </div>
      )}
    </div>
  )
}
