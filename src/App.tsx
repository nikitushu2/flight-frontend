import { useState, useEffect } from "react";
import { getAllDiaries, createDiary } from "./diaryService";
import { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({date: '', visibility: '', weather: '', comment: "test"});
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data))
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary(newDiary)
      .then(data => {
      setDiaries(diaries.concat(data))
    })
      .catch(error => {
        setError(error.response.data)
        setTimeout(() => {
          setError('');
        }, 5000);
      })

    setNewDiary({date: '', visibility: '', weather: '', comment: "test"})
  };

  return (
    <>
      <h1>Add new diary</h1>
      {error && error}
      <form onSubmit={diaryCreation} style={{"display": "flex"}}>

      <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={newDiary.date}
          onChange={(event) => setNewDiary({...newDiary, date: event.target.value})} 
        />

        <label htmlFor="visibility">Visibility:</label>
        <div id="visibility">
        <input
          type="radio"
          id="great"
          name="visibility"
          value="great"
          onChange={(event) => setNewDiary({...newDiary, visibility: event.target.value})} 
        />
        <label htmlFor="great">great</label>

        <input
          type="radio"
          id="good"
          name="visibility"
          value="good"
          onChange={(event) => setNewDiary({...newDiary, visibility: event.target.value})} 
        />
        <label htmlFor="good">good</label>

        <input
          type="radio"
          id="ok"
          name="visibility"
          value="ok"
          onChange={(event) => setNewDiary({...newDiary, visibility: event.target.value})} 
        />
        <label htmlFor="ok">ok</label>

        <input
          type="radio"
          id="poor"
          name="visibility"
          value="poor"
          onChange={(event) => setNewDiary({...newDiary, visibility: event.target.value})} 
        />
        <label htmlFor="poor">poor</label>
        </div>

        <label htmlFor="weather">Weather:</label>
        <div id="weather">
        <input
          type="radio"
          id="sunny"
          name="weather"
          value="sunny"
          onChange={(event) => setNewDiary({...newDiary, weather: event.target.value})} 
        />
        <label htmlFor="sunny">sunny</label>

        <input
          type="radio"
          id="rainy"
          name="weather"
          value="rainy"
          onChange={(event) => setNewDiary({...newDiary, weather: event.target.value})} 
        />
        <label htmlFor="rainy">rainy</label>

        <input
          type="radio"
          id="cloudy"
          name="weather"
          value="cloudy"
          onChange={(event) => setNewDiary({...newDiary, weather: event.target.value})} 
        />
        <label htmlFor="cloudy">cloudy</label>

        <input
          type="radio"
          id="stormy"
          name="weather"
          value="stormy"
          onChange={(event) => setNewDiary({...newDiary, weather: event.target.value})} 
        />
        <label htmlFor="stormy">stormy</label>

        <input
          type="radio"
          id="windy"
          name="weather"
          value="windy"
          onChange={(event) => setNewDiary({...newDiary, weather: event.target.value})} 
        />
        <label htmlFor="windy">windy</label>
        </div>

        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <div key={diary.date}>
        <p><b>{diary.date}</b></p>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default App
