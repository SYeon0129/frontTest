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



const SignupForm = (props) => {
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
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">

          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-5 pr-5 pb-5 pl-5 bg-white shadow-2xl rounded-xl relative z-10">
            <Typography variant="h2" className="font-bold mb-2 mt-4">정보수정</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
              <div className="w-full mr-0 mb-0 ml-0 relative space-y-4">
              <div className="text-center relative">
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
          </div>


          <div className="mb-1 flex flex-col gap-4 relative">
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
              </div>

                
              <div className="mb-1 flex flex-col gap-4 relative">
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

              <div className="mb-1 flex flex-col gap-4 relative">
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
              </div>


              <div className="mb-1 flex flex-col gap-4 relative">
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
              </div>
              <div className="mb-1 flex flex-col gap-4 relative">
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


                {/* 버튼 */}
                <div className="relative">
                <Button className="mt-6 bg-green-500" onClick={update} fullWidth>
             정보수정
            </Button>
                </div>
              </div>
            </div>
            <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72"/>
                      <circle cx="15.296" cy="3.445" r="2.719"/>
                      <circle cx="27.333" cy="3.445" r="2.72"/>
                      <circle cx="39.369" cy="3.445" r="2.72"/>
                      <circle cx="51.405" cy="3.445" r="2.72"/>
                      <circle cx="63.441" cy="3.445" r="2.72"/>
                      <circle cx="75.479" cy="3.445" r="2.72"/>
                      <circle cx="87.514" cy="3.445" r="2.719"/>
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72"/>
                      <circle cx="15.296" cy="3.525" r="2.719"/>
                      <circle cx="27.333" cy="3.525" r="2.72"/>
                      <circle cx="39.369" cy="3.525" r="2.72"/>
                      <circle cx="51.405" cy="3.525" r="2.72"/>
                      <circle cx="63.441" cy="3.525" r="2.72"/>
                      <circle cx="75.479" cy="3.525" r="2.72"/>
                      <circle cx="87.514" cy="3.525" r="2.719"/>
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72"/>
                      <circle cx="15.296" cy="3.605" r="2.719"/>
                      <circle cx="27.333" cy="3.605" r="2.72"/>
                      <circle cx="39.369" cy="3.605" r="2.72"/>
                      <circle cx="51.405" cy="3.605" r="2.72"/>
                      <circle cx="63.441" cy="3.605" r="2.72"/>
                      <circle cx="75.479" cy="3.605" r="2.72"/>
                      <circle cx="87.514" cy="3.605" r="2.719"/>
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72"/>
                      <circle cx="15.296" cy="3.686" r="2.719"/>
                      <circle cx="27.333" cy="3.686" r="2.72"/>
                      <circle cx="39.369" cy="3.686" r="2.72"/>
                      <circle cx="51.405" cy="3.686" r="2.72"/>
                      <circle cx="63.441" cy="3.686" r="2.72"/>
                      <circle cx="75.479" cy="3.686" r="2.72"/>
                      <circle cx="87.514" cy="3.686" r="2.719"/>
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72"/>
                      <circle cx="15.296" cy="2.767" r="2.719"/>
                      <circle cx="27.333" cy="2.767" r="2.72"/>
                      <circle cx="39.369" cy="2.767" r="2.72"/>
                      <circle cx="51.405" cy="2.767" r="2.72"/>
                      <circle cx="63.441" cy="2.767" r="2.72"/>
                      <circle cx="75.479" cy="2.767" r="2.72"/>
                      <circle cx="87.514" cy="2.767" r="2.719"/>
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72"/>
                      <circle cx="15.296" cy="2.846" r="2.719"/>
                      <circle cx="27.333" cy="2.846" r="2.72"/>
                      <circle cx="39.369" cy="2.846" r="2.72"/>
                      <circle cx="51.405" cy="2.846" r="2.72"/>
                      <circle cx="63.441" cy="2.846" r="2.72"/>
                      <circle cx="75.479" cy="2.846" r="2.72"/>
                      <circle cx="87.514" cy="2.846" r="2.719"/>
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72"/>
                      <circle cx="15.296" cy="2.926" r="2.719"/>
                      <circle cx="27.333" cy="2.926" r="2.72"/>
                      <circle cx="39.369" cy="2.926" r="2.72"/>
                      <circle cx="51.405" cy="2.926" r="2.72"/>
                      <circle cx="63.441" cy="2.926" r="2.72"/>
                      <circle cx="75.479" cy="2.926" r="2.72"/>
                      <circle cx="87.514" cy="2.926" r="2.719"/>
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="2.927" r="2.72"/>
                      <circle cx="15.296" cy="2.927" r="2.719"/>
                      <circle cx="27.333" cy="2.927" r="2.72"/>
                      <circle cx="39.369" cy="2.927" r="2.72"/>
                      <circle cx="51.405" cy="2.927" r="2.72"/>
                      <circle cx="63.441" cy="2.927" r="2.72"/>
                      <circle cx="75.479" cy="2.927" r="2.72"/>
                      <circle cx="87.514" cy="2.927" r="2.719"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-green-400 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72"/>
                      <circle cx="15.296" cy="3.445" r="2.719"/>
                      <circle cx="27.333" cy="3.445" r="2.72"/>
                      <circle cx="39.369" cy="3.445" r="2.72"/>
                      <circle cx="51.405" cy="3.445" r="2.72"/>
                      <circle cx="63.441" cy="3.445" r="2.72"/>
                      <circle cx="75.479" cy="3.445" r="2.72"/>
                      <circle cx="87.514" cy="3.445" r="2.719"/>
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72"/>
                      <circle cx="15.296" cy="3.525" r="2.719"/>
                      <circle cx="27.333" cy="3.525" r="2.72"/>
                      <circle cx="39.369" cy="3.525" r="2.72"/>
                      <circle cx="51.405" cy="3.525" r="2.72"/>
                      <circle cx="63.441" cy="3.525" r="2.72"/>
                      <circle cx="75.479" cy="3.525" r="2.72"/>
                      <circle cx="87.514" cy="3.525" r="2.719"/>
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72"/>
                      <circle cx="15.296" cy="3.605" r="2.719"/>
                      <circle cx="27.333" cy="3.605" r="2.72"/>
                      <circle cx="39.369" cy="3.605" r="2.72"/>
                      <circle cx="51.405" cy="3.605" r="2.72"/>
                      <circle cx="63.441" cy="3.605" r="2.72"/>
                      <circle cx="75.479" cy="3.605" r="2.72"/>
                      <circle cx="87.514" cy="3.605" r="2.719"/>
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72"/>
                      <circle cx="15.296" cy="3.686" r="2.719"/>
                      <circle cx="27.333" cy="3.686" r="2.72"/>
                      <circle cx="39.369" cy="3.686" r="2.72"/>
                      <circle cx="51.405" cy="3.686" r="2.72"/>
                      <circle cx="63.441" cy="3.686" r="2.72"/>
                      <circle cx="75.479" cy="3.686" r="2.72"/>
                      <circle cx="87.514" cy="3.686" r="2.719"/>
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72"/>
                      <circle cx="15.296" cy="2.767" r="2.719"/>
                      <circle cx="27.333" cy="2.767" r="2.72"/>
                      <circle cx="39.369" cy="2.767" r="2.72"/>
                      <circle cx="51.405" cy="2.767" r="2.72"/>
                      <circle cx="63.441" cy="2.767" r="2.72"/>
                      <circle cx="75.479" cy="2.767" r="2.72"/>
                      <circle cx="87.514" cy="2.767" r="2.719"/>
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72"/>
                      <circle cx="15.296" cy="2.846" r="2.719"/>
                      <circle cx="27.333" cy="2.846" r="2.72"/>
                      <circle cx="39.369" cy="2.846" r="2.72"/>
                      <circle cx="51.405" cy="2.846" r="2.72"/>
                      <circle cx="63.441" cy="2.846" r="2.72"/>
                      <circle cx="75.479" cy="2.846" r="2.72"/>
                      <circle cx="87.514" cy="2.846" r="2.719"/>
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72"/>
                      <circle cx="15.296" cy="2.926" r="2.719"/>
                      <circle cx="27.333" cy="2.926" r="2.72"/>
                      <circle cx="39.369" cy="2.926" r="2.72"/>
                      <circle cx="51.405" cy="2.926" r="2.72"/>
                      <circle cx="63.441" cy="2.926" r="2.72"/>
                      <circle cx="75.479" cy="2.926" r="2.72"/>
                      <circle cx="87.514" cy="2.926" r="2.719"/>
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="2.927" r="2.72"/>
                      <circle cx="15.296" cy="2.927" r="2.719"/>
                      <circle cx="27.333" cy="2.927" r="2.72"/>
                      <circle cx="39.369" cy="2.927" r="2.72"/>
                      <circle cx="51.405" cy="2.927" r="2.72"/>
                      <circle cx="63.441" cy="2.927" r="2.72"/>
                      <circle cx="75.479" cy="2.927" r="2.72"/>
                      <circle cx="87.514" cy="2.927" r="2.719"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            
          </div>
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12 ">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pl-14 ">
              {/* <img src="img/temp/needgirl10.jpg" className="btn-" alt="Health"/> */}
              <img src="img/temp/mypage.png" className="btn- shadow-2xl rounded-xl" alt="Health"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;