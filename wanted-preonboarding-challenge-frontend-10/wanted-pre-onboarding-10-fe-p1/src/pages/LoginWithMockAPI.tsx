import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

interface UserInfo {
  name: string
}

// 유저 생성
interface User {
  username: string,
  password: string,
  userInfo: UserInfo
}

// 유저 목록 생성
const users: User[] = [
  {
    username: 'sini1120',
    password: '1234',
    userInfo: { name: 'sieun' }
  },
  {
    username: 'sigi0721',
    password: '1234',
    userInfo: { name: 'hongsik' }
  }
]

const _secret: string = '123wqe!@#QWE'

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  const user: User | undefined = users.find((user: User) => { // 유저목록에서 로그인 유저 찾기
    return user.username === username && user.password === password
  })
  return user
    ? {message: 'SUCCESS', token: JSON.stringify({user: user.userInfo, secret:_secret})} // 토큰 직렬화
      : null
}

const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  const parsedToken = JSON.parse(token) // 토큰 역직렬화
  if (!parsedToken?.secret || parsedToken.secret !== _secret) return null

  const loggedUser: User | undefined = users.find((user: User) => { // 토큰 검증
    if (user.userInfo.name === parsedToken.user.name) return user
  })

  return loggedUser ? loggedUser.userInfo : null
}

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({name: ''})
  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);

    const loginRes = await login(formData.get('username') as string, formData.get('password') as string)
    if (!loginRes) return

    const userInfo = await getUserInfo(loginRes.token)
    if (!userInfo) return

    setUserInfo(userInfo)
  }

  return (<div>
    <h1>
      Login with Mock API
    </h1>

    <br />

    <form onSubmit={loginSubmitHandler}>
      {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}

      <Form.Label>Username</Form.Label>
      <Form.Control type="text" name="username" />
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          name="password"
      />
      <Button variant="dark" type="submit" value="Submit" size="lg">submit</Button>
    </form>

    <br />
    <br />

    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default LoginWithMockAPI
