export const getQueryType = (pathname) => {
  let type = undefined;
  let txt = undefined;
  if (pathname !== "") {
    type = pathname;
    if (pathname === "movie") {
      txt = "Movies";
    } else {
      txt = "TV Shows";
    }
  } else {
    type = "multi";
    txt = "Movies or TV Shows";
  }

  return { type, txt };
};
