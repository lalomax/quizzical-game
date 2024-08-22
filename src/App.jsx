import { useState, useEffect, useCallback } from "react";
import Button from "./components/Button";
import Settings from "./components/Settings";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import usefetch from "./usefetch";

function App() {
  const [items, setItems] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://opentdb.com/api.php?amount=5");

  const { data, isLoaded, refetch } = usefetch(apiUrl);

  // Shuffle array elements
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // Initialize items with quiz data
  useEffect(() => {
    if (isLoaded) {
      const formattedItems = data.data.results.map((el) => ({
        question: el.question,
        point: 0,
        answers: shuffle(
          [
            {
              answer: el.correct_answer,
              isCorrect: true,
              isSelected: false,
              id: nanoid(),
            },
            ...el.incorrect_answers.map((incorrect) => ({
              answer: incorrect,
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
            })),
          ]
        ),
      }));

      setItems(formattedItems);
    }
  }, [isLoaded, data]);

  // Check if the game is over
  useEffect(() => {
    setIsOver(items.every((item) => item.point === 1));
  }, [items]);

  // Handle answer selection
  const holdSelection = useCallback((id, i) => {
    setItems((prevItems) => {
      return prevItems.map((item, index) => {
        if (index !== i) return item;

        const updatedAnswers = item.answers.map((answer) => ({
          ...answer,
          isSelected: answer.id === id,
        }));

        const isCorrect = updatedAnswers.find(
          (ans) => ans.id === id && ans.isCorrect
        );

        return {
          ...item,
          answers: updatedAnswers,
          point: isCorrect ? 1 : 0,
        };
      });
    });
  }, []);

  // Handle settings form submission and update API URL
  const handleGenerate = (formData) => {
    const { trivia_amount, trivia_category, trivia_difficulty, trivia_type, trivia_encode } = formData;

    let url = `https://opentdb.com/api.php?amount=${trivia_amount}`;

    if (trivia_category !== "any") {
      url += `&category=${trivia_category}`;
    }
    if (trivia_difficulty !== "any") {
      url += `&difficulty=${trivia_difficulty}`;
    }
    if (trivia_type !== "any") {
      url += `&type=${trivia_type}`;
    }
    if (trivia_encode !== "default") {
      url += `&encode=${trivia_encode}`;
    }

    setApiUrl(url); // Update the API URL with the new settings
    refetch(); // Trigger the refetch to get new questions
  };

  // Render quiz items
  const itemsArray = items.map((el, i) => {
    const styles = {
      backgroundColor: el.point === 1 ? "#3b9660" : "black",
    };

    return (
      <div className="row" key={i} style={styles}>
        <div dangerouslySetInnerHTML={{ __html: el.question }} />
        {el.answers.map((answer) => (
          <Button
            key={answer.id}
            value={answer.answer}
            isSelected={answer.isSelected}
            holdSelection={() => holdSelection(answer.id, i)}
          />
        ))}
      </div>
    );
  });

  return (
    <div className="App">
      {isOver && <Confetti />}
      <Settings onGenerate={handleGenerate} />
      <h1>Quizzical Game</h1>
      {itemsArray}
      <button className="button-check" onClick={refetch}>
        New Game
      </button>
    </div>
  );
}

export default App;
