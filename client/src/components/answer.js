import { useEffect, useState } from "react";

const AddUserAnswer = ({ socket }) => {
  const [answer, setAnswer] = useState("");
  const [answerSubmit, setAnswerSubmit] = useState(false);
  const [emptyAnwser, setEmptyAnswer] = useState(false);

  const handleAnswer = () => {
    if (answer.length > 0) {
      socket.emit("answer", answer);
      setAnswerSubmit(true);
    } else {
      setEmptyAnswer(true);
    }
  };

  const updateAnswer = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <>
      {!answerSubmit && (
        <>
          <input
            type="text"
            value={answer}
            onChange={updateAnswer}
            placeholder="Ex: Ferrari"
          ></input>
          <button onClick={handleAnswer}>Submit!</button>
        </>
      )}
      {answerSubmit && (
        <p>Raspunsul dvs a fost: {answer}. Multumim pentru raspuns!</p>
      )}
      {emptyAnwser && <p>Va rugam introduceti un raspuns.</p>}
    </>
  );
};

export default AddUserAnswer;
