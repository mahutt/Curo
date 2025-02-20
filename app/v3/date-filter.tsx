import { ArrowRight, ChevronDown, Loader } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

export default function DateFilter() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Today')

  useEffect(() => {
    if (!date) return

    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday = date.toDateString() === today.toDateString()
    const isYesterday = date.toDateString() === yesterday.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()

    if (isToday) {
      setButtonLabel('Today')
    } else if (isYesterday) {
      setButtonLabel('Yesterday')
    } else if (isTomorrow) {
      setButtonLabel('Tomorrow')
    } else {
      setButtonLabel(
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      )
    }
  }, [date])

  const toggleCalendar = () => setIsOpen(!isOpen)

  const selectToday = () => {
    setDate(new Date())
    setIsOpen(false)
  }

  const selectTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setDate(tomorrow)
    setIsOpen(false)
  }

  return (
    <>
      <div className="relative z-20">
        <button
          onClick={toggleCalendar}
          className={`text-sm font-medium border transition-all duration-200
            ${
              isOpen
                ? 'text-green-500 border-green-500 bg-white'
                : 'text-gray-600 border-gray-300'
            } px-3 py-1 rounded-full flex items-center gap-1`}
        >
          {buttonLabel}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`absolute top-[105%] right-0 bg-white rounded-xl border transition-all duration-200 ${
            !isOpen && 'pointer-events-none opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              setIsOpen(false)
            }}
          />
          <div className="border-t w-[90%] mx-auto"></div>
          <div className="flex justify-between p-4 gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={selectToday}
            >
              <Loader />
              Today
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={selectTomorrow}
            >
              <ArrowRight />
              Tomorrow
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 backdrop-blur-[10px] z-10 transition-all duration-200 ${
          !isOpen && 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  )
}
