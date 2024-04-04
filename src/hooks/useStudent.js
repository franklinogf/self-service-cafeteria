import { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'
import { SCHOOLSOFT_STUDENTS_API_URL } from '../constants/school'

export function useStudent () {
  const { student, setStudent, pinConfirmed, setPinConfirmed } = useContext(StudentContext)

  const resetStudent = () => {
    setStudent(undefined)
    setPinConfirmed(false)
  }

  const login = ({ barCode }) => {
    // 120113675

    fetch(`${SCHOOLSOFT_STUDENTS_API_URL}?barcode=${barCode}`)
      .then(data => data.json())
      .then(json => {
        setStudent(json)
      })
  }

  const confirmPin = ({ pinCode }) => {
    if (student.pinCode !== pinCode) {
      setPinConfirmed(false)
      return false
    }
    setPinConfirmed(true)
    return true
  }

  return {
    student,
    login,
    resetStudent,
    pinConfirmed,
    confirmPin
  }
}
