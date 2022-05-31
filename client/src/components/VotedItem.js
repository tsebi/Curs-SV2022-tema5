const VotedItem = (props) => {
  let barFillHeight = "0%";

  if (props.count > 0) {
    barFillHeight = Math.round((props.count / props.maxValue) * 100) + "%";
  }

  return (
    <div>
      <div className="voted-item">
        <div className="highest-voted">
          <div
            className="fill-voted"
            style={{ backgroundColor: props.color, height: barFillHeight }}
          ></div>
        </div>
        <div className="voted-text">Marca: {props.brand}</div>
        <div className="voted-count">Voturi: {props.count}</div>
      </div>
    </div>
  );
};

export default VotedItem;
