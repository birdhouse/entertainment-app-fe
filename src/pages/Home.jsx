import { useMemo, Suspense, lazy } from "react";
import RegularCard from "../components/regularCard/RegularCard";
// import Trending from "../components/trending/Trending";
import { useGetTrendingQuery } from "../services/tmdbApi/tmdbApi";
import useContentWithBookmarks from "../hooks/useContentWithBookmarks";
import styles from "./home.module.scss";
import usePreloadImage from "../hooks/usePreloadImage";

const Trending = lazy(() => import("../components/trending/Trending"));

const Home = () => {
  const { data, isLoading, isError } = useGetTrendingQuery({
    mediaType: "all",
    timeWindow: "day",
  });

  const { contentWithBookmarkStatus } = useContentWithBookmarks(useMemo(() => data, [data]));

  // // 👇 Preload first trending image (likely LCP)
  // const firstImage = contentWithBookmarkStatus?.[0]?.poster_path
  //   ? `https://image.tmdb.org/t/p/w500${contentWithBookmarkStatus[0].poster_path}`
  //   : null;
  // usePreloadImage(firstImage);

  if (isLoading)
    return (
      <div className={styles.loading}>
        {" "}
        <p>Loading...</p>{" "}
      </div>
    );
  if (isError)
    return (
      <div className={styles.loading}>
        {" "}
        <p>Something went wrong.</p>
      </div>
    );
  if (!data || !data.results)
    return (
      <div className={styles.loading}>
        {" "}
        <p>No data found.</p>{" "}
      </div>
    );

  console.log(data);
  console.log("content with bookmarks", contentWithBookmarkStatus);

  return (
    <section className={styles.homePage}>
      <Suspense
        fallback={
          <div className={styles.loading}>
            <p>Loading trending...</p>
          </div>
        }
      >
        <Trending
          trendingData={contentWithBookmarkStatus}
          isLoading={isLoading}
          isError={isError}
        />
      </Suspense>
      {/* <Trending trendingData={contentWithBookmarkStatus} isLoading={isLoading} isError={isError} /> */}

      <section className={styles.recommended}>
        <h1 className="heading1">Recommended for you</h1>
        <ul>
          {contentWithBookmarkStatus.map((item) => (
            <RegularCard content={item} key={item.id} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Home;
