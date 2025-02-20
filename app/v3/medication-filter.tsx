import { Check, ChevronDown, Filter, Settings2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function MedicationFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [sortValue, setSortValue] = useState('Alphabetical')
  const [typeValue, setTypeValue] = useState('All Medications')

  // Sort options
  const sortOptions = [
    'Alphabetical',
    'Next Dose',
    'Recently Added',
    'Frequency',
  ] as const

  // Medication type options
  const typeOptions = [
    'All Medications',
    'Prescription Only',
    'Over-the-Counter',
    'Supplements',
    'Pain Relief',
  ] as const

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div className="relative z-20 h-full">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className={`h-full text-sm font-medium border transition-all duration-200
            ${
              isOpen
                ? 'text-green-500 border-green-500 bg-white'
                : 'text-gray-600 border-gray-300'
            } px-3 py-1 rounded-full flex items-center`}
        >
          <Settings2 className="w-4 h-4" />
          <div
            className={`overflow-hidden transition-all duration-200
             ${isOpen ? 'w-[95px] px-1' : 'w-0 px-0'}`}
          >
            <div className="w-[95px] text-green-500">Search filters</div>
          </div>
        </button>
        <div
          className={`absolute top-[105%] right-0 w-[240px] py-1 bg-white rounded-xl border transition-all duration-200 ${
            !isOpen && 'pointer-events-none opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sort By Section */}
          <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Sort by
          </div>

          {sortOptions.map((option, index) => (
            <div key={`sort-${option}`}>
              <button
                onClick={() => {
                  setSortValue(option)
                }}
                className={`flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                  sortValue === option
                    ? 'text-green-500 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {option}
                {sortValue === option && <Check className="w-4 h-4 ml-2" />}
              </button>
            </div>
          ))}

          {/* Divider between sections */}
          <div className="border-t w-[90%] mx-auto my-2"></div>

          {/* Types Section */}
          <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Types
          </div>

          {typeOptions.map((option, index) => (
            <div key={`type-${option}`}>
              <button
                onClick={() => {
                  setTypeValue(option)
                }}
                className={`flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                  typeValue === option
                    ? 'text-green-500 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {option}
                {typeValue === option && <Check className="w-4 h-4 ml-2" />}
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
