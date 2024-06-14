import { Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
import BoothInsertPage from "../pages/BoothInsertPage";
import AuthKakao from "../components/mypageCom/AuthKakao";
import Video from "../pages/Video";
import { AuthProvider } from "../context/AuthContext";
import NotificationComponent from "../components/notification/Notification";
import Notification from "../components/notification/Notification";
const { createBrowserRouter } = require("react-router-dom");

const Home = lazy(() => import("../pages/IndexPage"));
const DetailForum = lazy(() => import("../pages/DetailForum"));
const MyPage = lazy(() => import("../pages/MyPage"));
const MyFavorite = lazy(() => import("../pages/MyFavorite"));
const ViewHistory = lazy(() => import("../pages/ViewHistory"));
const BoothHeld = lazy(() => import("../pages/BoothHeld"));
const ChattingRoom = lazy(() => import("../pages/ChattingRoom"));
const VideoRoom = lazy(() => import("../components/booth/VideoRoom"))
// const FindPwd = lazy(() => import("../pages/find/FindPwdPage"));
const Login = lazy(() => import("../pages/Login"));
const BoothListPage = lazy(() => import("../pages/BoothListPage"));
const BoothDetailPage = lazy(() => import("../pages/BoothDetailPage"));

// const AccessToken = lazy(() => import("../pages/social/getAccessPage"));

const root = createBrowserRouter([

    {
        path: "",
        element: (
          <AuthProvider>
        <Suspense fallback={<Loading />}>
        <Notification />
            <Home/>
            </Suspense>
            </AuthProvider>
        ),
    },
    {
      path: "/detailForum",
      element: (
        <AuthProvider>
        <Suspense fallback={<Loading />}>
        <Notification />
          <DetailForum />
        </Suspense>
        </AuthProvider>
      ),
    },
    {
      path: "/myPage",
      element: (
        <AuthProvider>
        <Suspense fallback={<Loading />}>
        <Notification />
          <MyPage />
        </Suspense>
        </AuthProvider>
      ),
    },
  {
    path: "/boothheld",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothHeld />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/chat",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <ChattingRoom />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <Login />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/api/auth/kakao",
    element: (
      <AuthProvider>
    <Suspense fallback={<Loading />}>
    <Notification />
        <AuthKakao />
    </Suspense>
    </AuthProvider>
    ),
},  
  {
    path: "/booth/list",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothListPage />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/booth/:id",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothDetailPage />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/booths/company",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothListPage type="COMPANY" />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/booths/individual",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothListPage type="INDIVIDUAL" />
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/booth/VideoRoom/:videoRoomId",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
      <Notification />
        <VideoRoom/>
      </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "/booth/registration",
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
      <Notification />
        <BoothInsertPage />
      </Suspense>
      </AuthProvider>
    ),
  },
    {
        path: "/video/video",
        element: (
          <AuthProvider>
            <Suspense fallback={<Loading />}>
            <Notification />
            <Video />
            </Suspense>
            </AuthProvider>
        ),
    },
    {
      path: "/notiTest",
      element: (
        <AuthProvider>
          <Suspense fallback={<Loading />}>
          <Notification />
          <NotificationComponent />
          </Suspense>
          </AuthProvider>
      ),
  },

]);

export default root;
