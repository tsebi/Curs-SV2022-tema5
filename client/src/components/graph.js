import { useEffect, useState } from "react";
import VotedItem from "./VotedItem";

const GraphFromAnswers = ({ socket }) => {
  const [graphItem, setGraphItem] = useState([]);
  let totalMaximum = Math.max.apply(
    Math,
    graphItem.map(function (o) {
      return o.count;
    })
  );

  let teret = console.log(totalMaximum);

  useEffect(() => {
    socket.on("updated-poll", (arrayOfAnswers) => {
      console.table(arrayOfAnswers);
      setGraphItem(arrayOfAnswers);
    });
  }, [socket]);

  return (
    <div className="graph-from-answers">
      {teret}
      {graphItem.map((answer) => (
        <VotedItem
          key={answer.id}
          brand={answer.brand}
          count={answer.count}
          color={answer.color}
          maxValue={totalMaximum}
        />
      ))}
    </div>
  );
};

export default GraphFromAnswers;
