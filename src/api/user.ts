export const loginApi = (params: { username: string; password: string }): Promise<any> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        token: params.username === 'admin' ? 'admin' : 'roles'
      }
    })
  })
}

export const getUserInfoApi = (cookie: string): Promise<any> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        username: 'jack',
        roles:
          cookie === 'admin'
            ? [
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
            : [
                'form',
                'basicForm',
                'dashboard',
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
