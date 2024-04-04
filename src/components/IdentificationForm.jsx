import { Center } from '@chakra-ui/react'

import { ConfirmStudentPin } from './ConfirmStudentPin'
import { StudentLogin } from './StudentLogin'
import { useStudent } from '../hooks/useStudent'

export function IdentificationForm () {
  const { student } = useStudent()
  return (
    <Center as="main" height={'100vh'}>
      {!student && <StudentLogin />}
      {student && <ConfirmStudentPin />}
    </Center>
  )
}
