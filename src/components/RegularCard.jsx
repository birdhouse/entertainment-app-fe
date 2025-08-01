import React from "react";

const RegularCard = ({ content }) => {
  return (
    <li>
      <div>
        <div className="bookmarkIcon">
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" stroke="#FFF" fill="#000">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
      <div className="contentInfo">
        <div className="labels">
          <p className="release">{content.release_date}</p>
          <p className="release">{content.media_type}</p>
          <p className="release">{content.adult ? "18+" : "PG"}</p>
        </div>
        <div className="contentTitle">{content.original_title || content.original_name}</div>
      </div>
    </li>
  );
};

export default RegularCard;
