import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {

  const accessToken = localStorage.getItem("bbs_access_token");
  const email = localStorage.getItem("id");
  const username = localStorage.getItem("username");
// 값이 null이면 로그인 버튼, 아니면 로그아웃 버튼 출력
const buttonContent = accessToken ? (
  <div className="flex gap-3">
    <Typography
    variant="h6"
    className="my-auto">
     {username} 님
     </Typography>
  <Link to="./logout">
    <Button className="bg-green-500" size="sm" fullWidth>
      로그아웃
    </Button>
  </Link>
  <Link to="./mypage">
    <Button className="bg-green-500"  size="sm" fullWidth>
      마이페이지
    </Button>
  </Link>
</div>
) : (
  <div className="flex gap-3">
  <Link to="./Signin">
    <Button className="bg-green-500"  size="sm" fullWidth>
      로그인
    </Button>
  </Link>
  <Link to="./SignUp">
    <Button className="bg-green-500" size="sm" fullWidth>
      회원가입
    </Button>
  </Link>
  </div>
);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="medium"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
          <div className="flex items-center">
          <img src="/img/icon/logo1.png" alt="로고 이미지" className="w-auto h-32" />  
          <span className="text-xl">
            {brandName}</span>
            </div>
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}
  
        </div>
        <div className="hidden gap-2 lg:flex">


    <div>
      {buttonContent}
    </div>
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
        {navList}
          <a
            href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
            target="_blank"
            className="mb-2 block"
          >
            <Button variant="text" size="sm" fullWidth>
              로그인
            </Button>
          </a>
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "야생의 숨결",
  action: (
    <Link to="./Mypage">
<div>
  </div>    
   </Link>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
