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
        roles: ['form', 'basicForm', 'dashboard']
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
