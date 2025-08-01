export const getPathName = (pathname) => {
  let txt = undefined;
  if (pathname !== "") {
    if (pathname === "movie") {
      txt = "Movies";
    } else {
      txt = "TV Shows";
    }
  } else {
    txt = "Recommended for you";
  }

  return txt;
};
