import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const SignUpExam = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [birth, setBirth] = useState(""); // birth 상태 추가


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changeCheckPwd = (event) => {
    setCheckPwd(event.target.value);
  };

  const changeBirth = (event) => {
    setBirth(event.target.value); // birth 변경 함수 추가
  };

  /* 아이디 중복 체크 */
  const checkEmailDuplicate = async () => {
    await axios
      .get("http://localhost:8080/api/member/checkId", { params: { email: email } })
      .then((resp) => {
        console.log("[Join.js] checkEmailDuplicate() success :D");
        console.log(resp.data);

        if (resp.status === 200) {
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((err) => {
        console.log("[Join.js] checkEmailDuplicate() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      });
  };

  /* 회원가입 */
  const join = async () => {
    const req = {
      email: email,
      password: pwd,
      passwordCheck: checkPwd,
      username: name,
      birth: birth, // birth 필드 추가
    };

    await axios
      .post("http://localhost:8080/api/member/register", req)
      .then((resp) => {
        console.log("[Join.js] join() success :D");
        console.log(resp.data);
        alert(`${name}님 회원가입을 축하드립니다 🎊`);
        window.location.href = "/signin";
      })
      .catch((err) => {
        console.log("[Join.js] join() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      });
  };

  return (
<div className="w-2/5  lg:w-1/3 my-10 m-auto rounded-md shadow-md p-5">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-2 mt-4">회원가입</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
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
                value={email}
                onChange={changeEmail}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
                            <button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
                <i className="fas fa-check"></i> 이메일 중복 확인
              </button>
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
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                패스워드 확인
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="password2"
                value={checkPwd}
                onChange={changeCheckPwd}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                닉네임
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="닉네임"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="username"
                value={name}
                onChange={changeName}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                생일
              </Typography>
              <Input
                type="date"
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="birth"
                value={birth}
                onChange={changeBirth}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />


            </div>
            <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center justify-start font-medium"
          >
            개인정보 조회 동의
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      />
      <Button className="mt-6" onClick={join} fullWidth disabled={!isChecked}>
        회원가입
      </Button>

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              이미 계정이 있으신가요?
              <Link to="/SignIn" className="text-gray-900 ml-1">로그인 하러가기</Link>
            </Typography>
    
        </div>
  );
};

export default SignUpExam;
