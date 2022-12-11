const validateCPF = (cpf) => {
  return cpf.replaceAll('.', '').replace('-', '').length === 11;
}

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

const validateName = (name) => {
  return name.split(' ').length > 1;
}

const validatePassword = (password) => {
  return password.length >= 6;
}

const validateUser = ({ cpf, email, name, password }) => {
  return (
    validateCPF(cpf) &&
    validateEmail(email) &&
    validateName(name) &&
    validatePassword(password)
  )
}

module.exports = {
  validateCPF,
  validateEmail,
  validateName,
  validatePassword,
  validateUser
};
