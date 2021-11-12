import React from "react";

import Card from "./Card";

const CardGrid = () => {
  return (
    <div className="card-grid">
      {[1, 2, 3, 4, 5, 6].map((number, index) => {
        return <Card key={index} />;
      })}
    </div>
  );
};

export default CardGrid;
