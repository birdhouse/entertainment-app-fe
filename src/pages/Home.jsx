import RegularCard from "../components/regularCard/RegularCard";
import Trending from "../components/trending/Trending";
import { useGetTrendingQuery } from "../services/tmdbApi/tmdbApi";
import useContentWithBookmarks from "../utils/useContentWithBookmarks";
import styles from "./home.module.scss";

const Home = () => {
  const { data, isLoading, isError } = useGetTrendingQuery({
    mediaType: "all",
    timeWindow: "day",
  });

  const { contentWithBookmarkStatus } = useContentWithBookmarks(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);
  console.log("content with bookmarks", contentWithBookmarkStatus);

  return (
    <section className={styles.homePage}>
      <Trending />

      <section className={styles.recommended}>
        <h1 className="heading1">Recommended for you</h1>
        <ul>
          {contentWithBookmarkStatus.map((item) => (
            <RegularCard content={item} key={crypto.randomUUID()} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Home;
