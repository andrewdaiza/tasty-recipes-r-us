import React from "react";

const Special = ({ sData }) => {
  return (
    <div className='special'>
      <div>Special:</div>
      <div>{sData.title}</div>
      <div>{sData.type}</div>
      <div>{sData.text}</div>
    </div>
  );
};

export default Special;
