export const SCHOOL_ACRONYNM = window.location.pathname.split('/')[1] || 'cbl'
export const SCHOOLSOFT_API_URL = `https://www.schoolsoftpr.org/${SCHOOL_ACRONYNM}/cafeteria/self-service/requests`
export const SCHOOLSOFT_BUTTONS_API_URL = `${SCHOOLSOFT_API_URL}/buttons.php`
export const SCHOOLSOFT_STUDENTS_API_URL = `${SCHOOLSOFT_API_URL}/students.php`
export const SCHOOLSOFT_PAYMENT_API_URL = `${SCHOOLSOFT_API_URL}/payment.php`
