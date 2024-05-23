import UserLikedCamps from '@/components/camp/UserLikedCamp';
import './home.css'
import Top from '@/components/homecom/Top';

export function Home() {
  return (
    <>
          <Top />
          <UserLikedCamps />

    </>
  );
}

export default Home;
