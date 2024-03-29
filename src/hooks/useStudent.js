import { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'

export function useStudent () {
  const { student, setStudent, pinConfirmed, setPinConfirmed } = useContext(StudentContext)

  const resetStudent = () => {
    setStudent(undefined)
    setPinConfirmed(false)
  }

  const login = ({ barCode }) => {
    // 120113675
    setStudent({ name: 'Franklin Gonzalez' })
  }

  const confirmPin = ({ pinCode }) => {
    setPinConfirmed(true)
  }

  return {
    student,
    login,
    resetStudent,
    pinConfirmed,
    confirmPin
  }
}
