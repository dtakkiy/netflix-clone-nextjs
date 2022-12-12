import { requests } from 'libs/request';
import type { NextPage } from 'next';
import { Banner } from '@/components/Banner';
import { Nav } from '@/components/Nav';
import { Row } from '@/components/Row';

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <Nav />
      <Row
        title="NETFLIX ORIGUINALS"
        fetchUrl={requests.feachNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.feactTopRated} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="DOcumentaries" fetchUrl={requests.feactDocumentMovies} />{' '}
    </>
  );
};

export default Home;
