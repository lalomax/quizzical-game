import { useState, useEffect } from "react";
import Button from "./components/Button";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import usefetch from "./usefetch";

function App() {
  const [items, setItems] = useState([]);
  const [isOver, setIsOver] = useState(false);

  const { data, isLoaded, error, refetch } = usefetch(
    "https://opentdb.com/api.php?amount=5"
  );

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // if (isLoaded) {
  //   console.log(data.data.results)

  // } else {
  //   return <div className="">Loading</div>
  // }

  useEffect(() => {
    if (isLoaded) {
      setItems(
        data.data.results.map((el) => {
          return {
            question: el.question,
            point: 0,
            answers: shuffle([
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
            ))
          };
        })
      );
    }
    // handleGame()
  }, [isLoaded]);

  useEffect(() => {
    setIsOver(items.every((item) => item.point));
  }, [items]);

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
      backgroundColor: el.point === 1 ? "#3b9660" : "black",
    };
    return (
      <div className="row" key={i} point={items.point} style={styles}>
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
        {/* {i + 1 < items.length && <hr />} */}
      </div>
    );
  });

  // function handleGame() {
  //   setIsOver(false)
  //   refetch
  // }

  return (
    <div className="App">
      {isOver && <Confetti />}
      <h1>Quizzical Game</h1>
      {itemsArray}
      <button className="button-check" onClick={refetch}>
        New Game
      </button>
    </div>
  );
}

export default App;
