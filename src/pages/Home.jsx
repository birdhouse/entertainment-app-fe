import RegularCard from "../components/RegularCard";
import Trending from "../components/Trending";
import { useGetTrendingQuery } from "../features/tmdbApi/tmdbApi";

const Home = () => {
  const { data, isLoading, isError } = useGetTrendingQuery({
    mediaType: "all",
    timeWindow: "day",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);

  return (
    <>
      <>
        <Trending />
      </>

      <>
        <h1>Home</h1>
        <ul>
          {data.results.map((item) => (
            <RegularCard content={item} key={crypto.randomUUID()} />
          ))}
        </ul>
      </>
    </>
  );
};

export default Home;
