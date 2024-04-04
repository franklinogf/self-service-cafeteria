import { createContext, useState } from 'react'

export const StudentContext = createContext()

export function StudentProvider ({ children }) {
  const [student, setStudent] = useState(null)
  const [pinConfirmed, setPinConfirmed] = useState(false)
  return (
    <StudentContext.Provider value={{ student, setStudent, pinConfirmed, setPinConfirmed }}>
        {children}
    </StudentContext.Provider>
  )
}
