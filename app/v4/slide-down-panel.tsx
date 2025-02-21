import { Button } from '@/components/ui/button'
import { useAppState } from '@/context/app-state'
import { Bell, Pill, UserRound, X } from 'lucide-react'

export default function SlideDownPanel() {
  const { state, setAddMenuOpen } = useAppState()
  const open = state.addMenuOpen
  return (
    <div
      className={`absolute inset-0 z-40 bg-black/50 transition-opacity ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setAddMenuOpen(false)}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute top-0 inset-x-0 bg-white rounded-b-lg transition-transform ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4">
            <div className="text-lg font-semibold">
              {state.drawerObject?.name}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setAddMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="px-4 pb-4 flex flex-col items-center justify-center gap-2">
            <button
              className="w-full text-green-500 border border-green-500 rounded-lg py-2 px-4 flex items-center justify-center gap-2"
              onClick={() => setAddMenuOpen(false)}
            >
              <Pill className="h-4 w-4" />
              Add Medication
            </button>
            <button
              className="w-full text-green-500 border border-green-500 rounded-lg py-2 px-4 flex items-center justify-center gap-2"
              onClick={() => setAddMenuOpen(false)}
            >
              <UserRound className="h-4 w-4" />
              Add Practitioner
            </button>
            <button
              className="w-full bg-green-500 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2"
              onClick={() => setAddMenuOpen(false)}
            >
              <Bell className="h-4 w-4" />
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
