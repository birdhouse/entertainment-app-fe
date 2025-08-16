import TrendingCard from "../trendingCard/TrendingCard";
import styles from "./trending.module.scss";
import Slider from "../slider/Slider";

const Trending = ({ trendingData = [], isLoading, isError }) => {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <section className={styles.trending}>
      <h1 className="heading1">Trending</h1>
      <Slider data={trendingData} renderItem={(item) => <TrendingCard content={item} />} />
    </section>
  );
};

export default Trending;
