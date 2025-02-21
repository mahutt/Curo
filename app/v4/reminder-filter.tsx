import { Check, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ReminderFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<
    'Show All' | 'Medication Only' | 'Appointments Only'
  >('Show All')

  const options = ['Show All', 'Medication Only', 'Appointments Only'] as const

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div className="relative z-20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className={`text-sm font-medium border transition-all duration-200
            ${
              isOpen
                ? 'text-green-500 border-green-500 bg-white'
                : 'text-gray-600 border-gray-300'
            } px-3 py-1 rounded-full flex items-center gap-1`}
        >
          {value}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`absolute top-[105%] left-0 w-[200px] bg-white rounded-xl border transition-all duration-200 ${
            !isOpen && 'pointer-events-none opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option, index) => (
            <div key={option}>
              {index > 0 && <div className="border-t w-[90%] mx-auto"></div>}
              <button
                onClick={() => {
                  setValue(option)
                  setIsOpen(false)
                }}
                className={`flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                  value === option
                    ? 'text-green-500 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {option}
                {value === option && <Check className="w-4 h-4 ml-2" />}
              </button>
            </div>
          ))}
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
