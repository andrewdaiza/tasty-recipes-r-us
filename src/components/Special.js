import React from "react";

const Special = ({ sData }) => {
  return (
    <div className='special'>
      <span>{sData.title}</span>
      <span style={{ fontWeight: "bold" }}> {sData.type}</span>
      <div>{sData.text}</div>
    </div>
  );
};

export default Special;
