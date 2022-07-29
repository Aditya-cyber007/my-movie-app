import React from "react";

const NoResult = (props) => {
  return (
    <div className={props.class}>
      <img class="rounded mx-auto d-block" src="/assets/no result.svg" alt="no result found" />
    </div>
  );
};

export default NoResult;