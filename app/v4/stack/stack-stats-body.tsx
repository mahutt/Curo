import React, { useState } from 'react'
import { CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts'

export default function StackStatsBody() {
  const [selectedMedication, setSelectedMedication] =
    useState<keyof typeof adherenceData>('lisinopril')

  // Mock medications
  const medications = [
    { id: 'lisinopril', name: 'Lisinopril' },
    { id: 'metformin', name: 'Metformin' },
    { id: 'atorvastatin', name: 'Atorvastatin' },
  ]

  // Mock adherence data (past 7 days)
  const adherenceData = {
    lisinopril: [
      { day: 'Mon', taken: true },
      { day: 'Tue', taken: true },
      { day: 'Wed', taken: false },
      { day: 'Thu', taken: true },
      { day: 'Fri', taken: true },
      { day: 'Sat', taken: true },
      { day: 'Sun', taken: true },
    ],
    metformin: [
      { day: 'Mon', taken: true },
      { day: 'Tue', taken: true },
      { day: 'Wed', taken: false },
      { day: 'Thu', taken: true },
      { day: 'Fri', taken: true },
      { day: 'Sat', taken: false },
      { day: 'Sun', taken: true },
    ],
    atorvastatin: [
      { day: 'Mon', taken: true },
      { day: 'Tue', taken: false },
      { day: 'Wed', taken: true },
      { day: 'Thu', taken: true },
      { day: 'Fri', taken: false },
      { day: 'Sat', taken: true },
      { day: 'Sun', taken: true },
    ],
  }

  // Mock time-of-day data (when medication was taken)
  const timeData = {
    lisinopril: [
      { time: 'Morning (6-10am)', count: 12 },
      { time: 'Midday (10am-2pm)', count: 5 },
      { time: 'Afternoon (2-6pm)', count: 2 },
      { time: 'Evening (6-10pm)', count: 9 },
      { time: 'Night (10pm-6am)', count: 2 },
    ],
    metformin: [
      { time: 'Morning (6-10am)', count: 15 },
      { time: 'Midday (10am-2pm)', count: 8 },
      { time: 'Afternoon (2-6pm)', count: 3 },
      { time: 'Evening (6-10pm)', count: 2 },
      { time: 'Night (10pm-6am)', count: 2 },
    ],
    atorvastatin: [
      { time: 'Morning (6-10am)', count: 4 },
      { time: 'Midday (10am-2pm)', count: 2 },
      { time: 'Afternoon (2-6pm)', count: 1 },
      { time: 'Evening (6-10pm)', count: 18 },
      { time: 'Night (10pm-6am)', count: 5 },
    ],
  }

  // Mock monthly adherence trend
  const monthlyData = {
    lisinopril: [
      { month: 'Jan', adherence: 85 },
      { month: 'Feb', adherence: 90 },
      { month: 'Mar', adherence: 78 },
      { month: 'Apr', adherence: 92 },
      { month: 'May', adherence: 88 },
      { month: 'Jun', adherence: 95 },
    ],
    metformin: [
      { month: 'Jan', adherence: 82 },
      { month: 'Feb', adherence: 79 },
      { month: 'Mar', adherence: 85 },
      { month: 'Apr', adherence: 88 },
      { month: 'May', adherence: 92 },
      { month: 'Jun', adherence: 90 },
    ],
    atorvastatin: [
      { month: 'Jan', adherence: 75 },
      { month: 'Feb', adherence: 80 },
      { month: 'Mar', adherence: 82 },
      { month: 'Apr', adherence: 78 },
      { month: 'May', adherence: 85 },
      { month: 'Jun', adherence: 92 },
    ],
  }

  // Calculate adherence percentage
  const calculateAdherence = (data: { day: string; taken: boolean }[]) => {
    const taken = data.filter((day) => day.taken).length
    return Math.round((taken / data.length) * 100)
  }

  // Prepare pie chart data for adherence
  const getPieData = (medication: string) => {
    const adherence = calculateAdherence(
      adherenceData[medication as keyof typeof adherenceData]
    )
    return [
      { name: 'Taken', value: adherence, id: 'taken' },
      { name: 'Missed', value: 100 - adherence, id: 'missed' },
    ]
  }

  const COLORS = ['#4ade80', '#f87171']

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center gap-2">
        <h1 className="flex-1 text-xl font-medium text-gray-800 tracking-tight">
          Medication Analytics
        </h1>
        <div>
          <Select
            value={selectedMedication}
            onValueChange={(value) =>
              setSelectedMedication(value as keyof typeof adherenceData)
            }
          >
            <SelectTrigger className="gap-2">
              <SelectValue placeholder="Select medication" />
            </SelectTrigger>
            <SelectContent align="end">
              {medications.map((med) => (
                <SelectItem key={med.id} value={med.id}>
                  {med.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t mt-6 w-full h-0"></div>

      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
      {/* Card 1: Weekly Adherence Rate */}

      <div className="h-[480px] pt-4 pb-4 overflow-y-auto">
        <CardTitle className="text-base font-medium">
          Weekly Adherence
        </CardTitle>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieData(selectedMedication)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name }) => `${name}`}
              >
                {getPieData(selectedMedication).map((entry, index) => (
                  <Cell
                    key={`cell-${entry.id}-${index}-${entry.value}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          {calculateAdherence(adherenceData[selectedMedication])}% doses taken
          this week
        </p>

        {/* Card 2: Time of Day Taken */}

        <CardTitle className="pt-8 pb-4 text-base font-medium">
          Time of Day Taken
        </CardTitle>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeData[selectedMedication]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Most common:{' '}
          {
            timeData[selectedMedication].reduce((prev, current) =>
              prev.count > current.count ? prev : current
            ).time
          }
        </p>

        {/* <div className="border-t w-full"></div> */}

        {/* Card 3: Monthly Adherence Trend */}

        <CardTitle className="pt-8 pb-4 text-base font-medium">
          6-Month Adherence Trend
        </CardTitle>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData[selectedMedication]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="adherence"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Adherence Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around items-center mt-2">
          <p className="text-sm text-gray-500">
            Average:{' '}
            {Math.round(
              monthlyData[selectedMedication].reduce(
                (sum, item) => sum + item.adherence,
                0
              ) / monthlyData[selectedMedication].length
            )}
            %
          </p>
          <p className="text-sm text-gray-500">
            Trend:{' '}
            {monthlyData[selectedMedication][5].adherence >
            monthlyData[selectedMedication][0].adherence
              ? 'Improving'
              : 'Declining'}
          </p>
        </div>
      </div>
    </div>
  )
}
