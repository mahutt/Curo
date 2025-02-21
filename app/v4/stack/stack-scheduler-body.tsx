import React, { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarCheck } from 'lucide-react'

function HCPStackBody() {
  const [date, setDate] = useState<Date | undefined>()
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  useEffect(() => {
    const generateDisabledDates = () => {
      const today = new Date()
      const disabledDays = []

      for (let i = 0; i < 30; i++) {
        const currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        const dayOfWeek = currentDate.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6 || Math.random() < 0.3) {
          disabledDays.push(new Date(currentDate))
        }
      }

      setDisabledDates(disabledDays)
    }

    generateDisabledDates()
  }, [])

  useEffect(() => {
    if (date) {
      generateAvailableTimeSlots()
    }
  }, [date])

  const generateAvailableTimeSlots = () => {
    const slots = []
    const startHour = 8
    const endHour = 17

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        if (Math.random() < 0.7) {
          const formattedHour = hour.toString().padStart(2, '0')
          const formattedMinute = minute.toString().padStart(2, '0')
          slots.push(`${formattedHour}:${formattedMinute}`)
        }
      }
    }

    setAvailableTimes(slots)
    setStartTime('')
    setEndTime('')
  }

  const getAvailableEndTimes = () => {
    if (!startTime) return []

    const startIndex = availableTimes.indexOf(startTime)
    if (startIndex === -1 || startIndex === availableTimes.length - 1) return []

    return availableTimes.slice(startIndex + 1)
  }

  const canSchedule = date && startTime && endTime

  const handleScheduleAppointment = () => {
    if (canSchedule) {
      alert(
        `Appointment scheduled for ${date.toDateString()} from ${startTime} to ${endTime}`
      )
    }
  }

  const TimeSlotSelect = ({
    value,
    onChange,
    options,
    placeholder,
  }: {
    value: string
    onChange: (value: string) => void
    options: string[]
    placeholder: string
  }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {options.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) =>
        disabledDate.getDate() === date.getDate() &&
        disabledDate.getMonth() === date.getMonth() &&
        disabledDate.getFullYear() === date.getFullYear()
    )
  }

  return (
    <div className="flex-1 mb-4 border-t pt-4 flex flex-col gap-4">
      <div className="text-sm text-gray-500">Schedule an appointment</div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={(e) => {
          setDate(e)
        }}
        disabled={[{ before: new Date() }, (date) => isDateDisabled(date)]}
        className="rounded-md border flex justify-center items-center"
      />

      {date && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Start Time</label>
            <TimeSlotSelect
              value={startTime}
              onChange={setStartTime}
              options={availableTimes}
              placeholder="Select start time"
            />
          </div>

          {startTime && (
            <div>
              <label className="text-sm font-medium mb-1 block">End Time</label>
              <TimeSlotSelect
                value={endTime}
                onChange={setEndTime}
                options={getAvailableEndTimes()}
                placeholder="Select end time"
              />
            </div>
          )}
        </div>
      )}

      <Button
        className="w-full bg-green-500 hover:bg-green-600"
        disabled={!canSchedule}
        onClick={handleScheduleAppointment}
      >
        Schedule Appointment
        <CalendarCheck className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default HCPStackBody
