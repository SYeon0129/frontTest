import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { HttpHeadersContext } from '@/context/HttpHeadersProvider';


const Profile = (props) => {
  const emails = localStorage.getItem("id");
  const { headers, setHeaders } = useContext(HttpHeadersContext);
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");
  const [birth, setBirth] = useState("");

    const email = props.email;

	const navigate = useNavigate();

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

  const changeBirth = (event) => {
		setBirth(event.target.value);
	}

    useEffect(() => {
        setHeaders({
            "Authorization": `Bearer ${localStorage.getItem("bbs_access_token")}`
        });
        setName(props.name);
    }, [props.name]);

	/* 회원 정보 수정 */
	const update = async () => {

		const req = {
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
      birth: birth,
		}

		await axios.post("http://localhost:8080/api/member/update", req, {headers: headers})
			.then((resp) => {
				console.log("[MemberUpdate.js] update() success :D");
				console.log(resp.data);

				alert(resp.data.username + "님의 회원 정보를 수정했습니다");
				navigate("/");

			}).catch((err) => {
				console.log("[MemberUpdate.js] update() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}
			});
	}

  return (
<div className="w-2/5  lg:w-1/3 my-10 m-auto rounded-md shadow-md p-5">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-2 mt-4">정보수정</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
          </div>
  
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                이메일
              </Typography>
              <Input
                type="email"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="id"
                readOnly
                value={emails}
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


            <Button className="mt-6" onClick={update} fullWidth>
             정보수정
            </Button>

   
    
        </div>
  );
};



export default Profile;