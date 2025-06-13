import {
  Card,
  Text,
  Image,
  Heading,
  CardHeader,
  CardBody,
  Center,
  Button
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useStudent } from '../hooks/useStudent'
import { NumbersPad } from './NumbersPad'
import { InputsPin } from './InputsPin'
import { AdminLogin } from './AdminLogin'
import { SCHOOLSOFT_ADMIN_API_URL } from '../constants/school'

export function ConfirmStudentPin () {
  const { student, confirmPin, resetStudent, createNewPin } = useStudent()
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState({ pin: '', confirmPin: '' })
  const [newPinError, setNewPinError] = useState(false)
  const firstPinInput = useRef()
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')
  const [adminError, setAdminError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [adminConfirmed, setAdminConfirmed] = useState(false)

  const handlePinComplete = (pinCode) => {
    const confirmed = confirmPin({ pinCode })
    if (!confirmed) {
      setError(true)
      setPin('')
      firstPinInput.current.focus()
    }
  }

  const handleCancel = () => {
    resetStudent()
  }
  const handleNumberClick = (number) => {
    const newPin = pin.concat(number)
    setPin(newPin)
    if (newPin.length === 4) {
      handlePinComplete(newPin)
    }
  }
  const handleNewPinNumberClick = (number) => {
    if (newPin.pin.length < 4) {
      const pin = newPin.pin.concat(number)
      setNewPin({ confirmPin: '', pin })
    } else {
      const confirmPin = newPin.confirmPin.concat(number)
      setNewPin({ ...newPin, confirmPin })
    }
  }
  const handleNewPinChange = (name) => (value) => {
    setNewPin({ [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError(false)
    const form = new FormData(e.target)
    const barCode = form.get('barCode')
    if (barCode === '') {
      setAdminError(true)
      return
    }
    const response = await fetch(SCHOOLSOFT_ADMIN_API_URL)
    const admin = await response.json()
    if (barCode === admin.pinCode) {
      setAdminConfirmed(true)
      setLoginError(false)
      setAdminError(false)
      return
    }
    setLoginError(true)
  }

  const handleNewPinSave = async () => {
    if (newPin.pin === newPin.confirmPin) {
      setNewPinError(false)
      setAdminConfirmed(false)
      await createNewPin({ pinCode: newPin.pin })
    } else {
      setNewPinError(true)
      setNewPin({ pin: '', confirmPin: '' })
    }
  }

  const handleNewPinErase = () => {
    if (newPin.confirmPin.length > 0) {
      const str = newPin.confirmPin.slice(0, -1)
      setNewPin({ ...newPin, confirmPin: str })
    } else if (newPin.pin.length > 0) {
      const str = newPin.pin.slice(0, -1)
      setNewPin({ ...newPin, pin: str })
    }
  }
  const handlePinErase = () => {
    if (pin.length > 0) {
      const str = pin.slice(0, -1)
      setPin(str)
    }
  }

  return (
    <Card size={'sm'} w={[600]}>
      <CardHeader>
        <Heading textAlign={'center'} as="h1">
          {student.pinCode !== ''
            ? 'Entra tu pin'
            : (
                adminConfirmed
                  ? 'Crea tu pin'
                  : (
                  <div className='grid'>
              No tiene un pin creado
              <span className='text-sm text-red-400'>Por favor contacta a un administrador para que puedas crear tu pin</span>
            </div>
                    )
              )}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text textAlign={'center'} fontSize={'lg'} opacity={0.7}>
          {student.name}
        </Text>
        {student.profilePictureUrl && (
          <Image
            mx={'auto'}
            src={student.profilePictureUrl}
            my={2}
            boxSize={100}
            alt={student.name}
          />
        )}
        <Center flexDirection={'column'} gap={5}>
          {student.pinCode !== '' && <InputsPin autoFocus error={error} pin={pin} firstInputRef={firstPinInput} onPinChange={setPin} onComplete={handlePinComplete} /> }
          {student.pinCode === '' && !adminConfirmed && <AdminLogin value={value} onValueChange={setValue} onSubmit={handleSubmit} error={adminError} loginError={loginError} />}
          {(student.pinCode === '' && adminConfirmed) && (
          <>
          <div>
          <span className='font-semibold'>Nuevo pin</span>
          <InputsPin autoFocus pin={newPin.pin} onPinChange={handleNewPinChange('pin')}/>
          </div>
         <div>
         <span className='font-semibold'>Confirmar pin</span>
          <InputsPin pin={newPin.confirmPin} onPinChange={handleNewPinChange('confirmPin')}/>
         </div>
         {newPinError && (
          <div>
            <span className='font-semibold text-red-500'>No coinciden</span>
          </div>
         )}
          </>
          )}
          {(student.pinCode !== '' || adminConfirmed) && <NumbersPad onErase={adminConfirmed ? handleNewPinErase : handlePinErase} onNumberPress={adminConfirmed ? handleNewPinNumberClick : handleNumberClick}/>}
          {adminConfirmed && <Button onClick={handleNewPinSave} colorScheme='green'>Guardar</Button>}
          <Button onClick={handleCancel}>
              Cancelar
            </Button>
        </Center>
      </CardBody>
    </Card>
  )
}
