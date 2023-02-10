import { useState, useEffect } from "react";
import Button from "./components/Button";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Swal from "sweetalert2";
import usefetch from "./usefetch";

function App() {
  const [items, setItems] = useState([]);
  const [isOver, setIsOver] = useState(false);

  const {} = usefetch()

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setItems(
          data.results.map((el) => {
            return {
              question: el.question,
              point: 0,
              answers: [
                {
                  answer: el.correct_answer,
                  isCorrect: true,
                  isSelected: false,
                  id: nanoid(),
                },
              ].concat(
                el.incorrect_answers.map((el) => {
                  return {
                    answer: el,
                    isCorrect: false,
                    isSelected: false,
                    id: nanoid(),
                  };
                })
              ),
            };
          })
        );
      });

      // handleGame()  
  }, []);

  useEffect(() => {
    setIsOver(items.every((item) => item.point))
  }, [items])

  function holdSelection(id, i) {
    setItems((oldItems) => {
      const newItems = [...oldItems];
      const item = newItems[i];
      newItems[i].point = 0;

      newItems[i].answers = item.answers.map((el) =>
        el.id === id
          ? { ...el, isSelected: true }
          : { ...el, isSelected: false }
      );

      item.answers.map((el) => {
        if (el.isSelected && el.isCorrect) {
          newItems[i].point = 1;
        }
      });
      return newItems;
    });
  }

  let itemsArray = items.map((el, i) => {
    const styles = {
      backgroundColor: el.point === 1 ? "dodgerblue" : "black",
    };
    return (
      <div key={i} point={items.point} style={styles}>
        <div dangerouslySetInnerHTML={{ __html: el.question }} />
        {el.answers.map((item) => {
          return (
            <Button
              key={item.id}
              value={item.answer}
              isSelected={item.isSelected}
              holdSelection={() => holdSelection(item.id, i)}
            />
          );
        })}
        {i + 1 < items.length && <hr />}
      </div>
    );
  });

  function handleGame() {
  //  const countAnswers = items.reduce((ac, cur) => ac + cur.point, 0 )
  //  if (countAnswers === items.length) setIsOver(true)
  // if (!isOver) 
   
  }

  return (
    <div className="App">
      {isOver && <Confetti />}
      {itemsArray}
      <button className="button-check" onClick={handleGame}>
        {isOver ? "New Game" : "Check results"}
      </button>
    </div>
  );
}

export default App;
