import React, { useState } from 'react'
import {getCurrentUserInfo, getCurrentUserInfoWithToken, loginWithToken} from '../../api/login'
import { UserInfo } from '../../types/user'
import {Button, Form} from "react-bootstrap";

const JWTLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const loginResult = await  loginWithToken({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    })

    // TODO: 로그인 연결 및 토큰 가져오기 (loginWithToken 함수 사용)
    // 로그인 실패시 함수를 종료합니다.
    if (loginResult.result === 'fail') return

    // 로그인 성공시, getCurrentUserInfoWithToken 함수를 호출하여 userInfo를 가져옵니다.
    // TODO: 유저 정보 가져오기 (getCurrentUserInfoWithToken 함수 사용)
    const userInfo = await  getCurrentUserInfoWithToken(loginResult.access_token)
    // 유저 정보 가져오기 실패시 함수를 종료합니다.
    if (userInfo === null) return
    // 유저 정보 가져오기 성공시, userInfo 상태를 업데이트합니다.
    setUserInfo(userInfo)
  }

  return (<div>
    <h1>
      Login with JWT - in memory
    </h1>
    <br />
    <form onSubmit={loginSubmitHandler}>
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
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default JWTLogin
