import { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'
import { SCHOOLSOFT_STUDENTS_API_URL } from '../constants/school'

export function useStudent () {
  const { student, setStudent, pinConfirmed, setPinConfirmed } = useContext(StudentContext)

  const resetStudent = () => {
    setStudent(undefined)
    setPinConfirmed(false)
  }

  const login = async ({ barCode }) => {
    // 120113675

    return fetch(`${SCHOOLSOFT_STUDENTS_API_URL}?barcode=${barCode}`)
      .then(data => data.json())
      .then(json => {
        if (json !== null) {
          setStudent(json)
          return true
        }
        return false
      })
  }

  const createNewPin = async ({ pinCode }) => {
    const data = {
      pinCode,
      id: student.id
    }
    return fetch(SCHOOLSOFT_STUDENTS_API_URL, { method: 'POST', body: JSON.stringify(data) })
      .then(data => data.json())
      .then(json => {
        if (json !== null) {
          setStudent(json)
          return true
        }
        return false
      }).catch(error => console.log({ error }))
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
    confirmPin,
    createNewPin
  }
}
