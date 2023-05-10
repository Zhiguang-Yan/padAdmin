export const loginApi = (): Promise<any> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        token: 'fuck_token'
      }
    })
  })
}

export const getUserInfoApi = (): Promise<any> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        username: 'jack',
        roles: [
          'form',
          'basicForm',
          'dashboard',
          'dynamicForm',
          'menu',
          'menu1',
          'menu2',
          'menu21',
          'menu22',
          'menu221',
          'menu222',
          'menu3',
          'menu31',
          'menu32'
        ]
      }
    })
  })
}

export const logoutApi = (): Promise<any> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        code: 200
      }
    })
  })
}
