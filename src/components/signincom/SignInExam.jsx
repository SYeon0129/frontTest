import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "@/context/AuthProvider";
import { HttpHeadersContext } from "@/context/HttpHeadersProvider";
import { useNavigate } from "react-router";

const SignInexam = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [saveId, setSaveId] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("saved_id");
    if (savedId) {
      setId(savedId);
      setSaveId(true);
    }
  }, []);

  const changeId = (event) => {
    setId(event.target.value);
  }

  const changePwd = (event) => {
    setPwd(event.target.value);
  }

  const toggleSaveId = (event) => {
    setSaveId(event.target.checked);
  }

  const login = async () => {
    const req = {
      email: id,
      password: pwd
    }

    await axios.post("http://localhost:8080/api/member/login", req)
      .then((resp) => {
        console.log("[Login.js] login() success :D");
        console.log(resp.data);

        alert(resp.data.username + "님, 성공적으로 로그인 되었습니다 🔐");

        // JWT 토큰 저장
        localStorage.setItem("bbs_access_token", resp.data.token);
        localStorage.setItem("id", resp.data.email);
        localStorage.setItem("username", resp.data.username);

        setAuth(resp.data.email); // 사용자 인증 정보(아이디 저장)
        setHeaders({ "Authorization": `Bearer ${resp.data.token}` }); // 헤더 Authorization 필드 저장

        if (saveId) {
          localStorage.setItem("saved_id", id);
        } else {
          localStorage.removeItem("saved_id");
        }

        window.location.href = "/";
      }).catch((err) => {
        console.log("[Login.js] login() error :<");
        console.log(err);

        alert("⚠️ " + err.response.data);
      });
  }

  


  const onNaverLogin = () => {

    window.location.href = "http://localhost:8080/oauth2/authorization/naver"
}

const onGoogleLogin = () => {

    window.location.href = "http://localhost:8080/oauth2/authorization/google"
}

const onKakaoLogin = () => {

    window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
}


  return (
    <div className="w-2/5 lg:w-1/3 my-10 m-auto rounded-md shadow-md p-5">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-2 mt-4">로그인</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">이메일과 패스워드를 입력해주세요</Typography>
      </div>

      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          이메일
        </Typography>
        <Input
          type="email"
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          name="id"
          value={id}
          onChange={changeId}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          패스워드
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          name="password"
          value={pwd}
          onChange={changePwd}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>

      <Button className="mt-6" onClick={login} fullWidth>
        로그인
      </Button>
      <div className="flex items-center justify-between gap-2 mt-6">
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center justify-start font-medium"
            >
              아이디 저장
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          checked={saveId}
          onChange={toggleSaveId}
        />
        <Typography variant="small" className="font-medium text-gray-900">
          <a href="#">
           
          </a>
        </Typography>
      </div>
      <div className="flex justify-center items-center">

      <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth onClick={onGoogleLogin}>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1156_824)">
                    <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                    <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                    <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                    <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <span>구글 계정으로 로그인</span>
              </Button>
              <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth onClick={onKakaoLogin}>
                <img src="/img/icon/kakaologo.png" height={24} width={24} alt="" />
                <span>카카오 계정으로 로그인</span>
              </Button>
      </div>
      <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
        아이디가 없으신가요?
        <Link to="/SignUp" className="text-gray-900 ml-1">회원가입</Link>
      </Typography>
    </div>
  );
};

export default SignInexam;
