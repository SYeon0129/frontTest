import React, { useContext, useEffect, useState } from 'react';
import './Notification.css';
import { API_URLS } from '../../api/apiConfig';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Notification = () => {
  const { authState } = useContext(AuthContext);
  const { isLoggedIn, memberId } = authState;

  const [newNotice, setNewNotice] = useState(null);
  const [animationClass, setAnimationClass] = useState('');
  const [likedBooths, setLikedBooths] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setNewNotice(null); // 로그인되지 않은 상태에서는 알림 초기화
    }
  }, [isLoggedIn]);

  const handleClose = () => {
    setAnimationClass('slide-out');

    // 알림 제거 후 상태 초기화
    const clearNoticeTimer = setTimeout(() => {
      setNewNotice(null);
    }, 1000);

    return () => clearTimeout(clearNoticeTimer);
  };

  // 찜한 부스 가져오기
  useEffect(() => {
    const fetchLikedBooths = async () => {
      if (!memberId) return; // member_id가 없으면 호출하지 않음
      try {
        const response = await axios.get(`${API_URLS.BOOTH_LIKED_LIST}/${memberId}`);
        setLikedBooths(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedBooths();
  }, [memberId]);

  useEffect(() => {
    if (!isLoggedIn || likedBooths.length === 0) {
      return;
    }

    const eventSource = new EventSource(`http://localhost:8080/notifications/subscribe/${memberId}`);
    console.log('SSE 연결 시도');

    eventSource.onmessage = event => {
      const newMessage = event.data;
      console.log('SSE 메시지 수신:', newMessage);

      // 새 메시지를 처리하고 알림 표시
      checkAndNotify(newMessage);
    };

    eventSource.onerror = error => {
      console.error('SSE 오류:', error);
      eventSource.close();
    };

    // 1분마다 checkAndNotify 함수 실행
    const interval = setInterval(() => checkAndNotify(), 60000); // 1분(60초)

    return () => {
      clearInterval(interval); // 클리어 interval
      eventSource.close(); // 종료 eventSource
      console.log('SSE 연결 종료');
    };
  }, [isLoggedIn, likedBooths, memberId]);

// 찜한 부스들을 순회하면서 알림을 확인
  const checkAndNotify = (newMessage) => {
    let notified = false; // 이미 알림을 보낸 경우를 체크하기 위한 플래그

    likedBooths.forEach(booth => {
      const boothStartTime = new Date(booth.startTime);
      const boothDate = new Date(booth.date);
      const currentTime = new Date();
      const thirtyMinutesInMillis = 30 * 60 * 1000;

      const boothStartDateTime = new Date(
        boothDate.getFullYear(),
        boothDate.getMonth(),
        boothDate.getDate(),
        boothStartTime.getHours(),
        boothStartTime.getMinutes()
      );

      // 부스 시작 30분 전에 알림을 보냄
      if (boothStartDateTime.getTime() - currentTime.getTime() <= thirtyMinutesInMillis &&
        boothStartDateTime.getTime() > currentTime.getTime()) {
        setNewNotice({
          type: 'booth_starting_soon',
          title: booth.name,
          startTime: booth.startTime
        });
        setAnimationClass('slide-in');

        notified = true;

        const slideOutTimer = setTimeout(() => {
          setAnimationClass('slide-out');

          const clearNoticeTimer = setTimeout(() => {
            setNewNotice(null);
          }, 1000);

          return () => clearTimeout(clearNoticeTimer);
        }, 10000);

        return () => clearTimeout(slideOutTimer); // 부스에 대한 알림만 처리하고 루프 종료
      }
    });

    // SSE 메시지를 통한 알림 처리
    if (newMessage && !notified) {
      console.log('새 메시지로 알림 표시:', newMessage);
      setNewNotice({
        type: 'notification',
        title: newMessage,
        startTime: new Date().toLocaleTimeString()
      });
      setAnimationClass('slide-in');

      const slideOutTimer = setTimeout(() => {
        setAnimationClass('slide-out');

        const clearNoticeTimer = setTimeout(() => {
          setNewNotice(null);
        }, 1000);

        return () => clearTimeout(clearNoticeTimer);
      }, 10000);

      return () => clearTimeout(slideOutTimer);
    }
  };

  return (
    <div className={`background ${newNotice ? 'slide-in' : animationClass}`}>
      {newNotice && <p>{`"${newNotice.title}" 부스가 ${newNotice.startTime}에 시작합니다.`}</p>}
      {newNotice && <button onClick={handleClose}>Close</button>}
    </div>
  );
};

export default Notification;
