const a = [
  {
    id: '12345678999',
    name: 'teste teste',
    email: 'pedrofulfaro@gmail.com',
    password: '12345678999',
    is_admin: false,
    bankBalance: 175
  },
  {
    id: '12345678987',
    name: 'teste teste',
    email: 'shaodre@gmail.com',
    password: '12345678987',
    is_admin: false,
    bankBalance: 98285501
  }
]

const result = a.filter((user) => user.id == 12345678987);

console.log(result)