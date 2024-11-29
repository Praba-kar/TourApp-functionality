import "./App.css";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";

const url = "https://www.course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = (id) => {
    const newTour = tours.filter((tour, index) => tour.id !== id);
    setTours(newTour);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setTours(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h1>No tours left</h1>
          <button className="btn" onClick={fetchData}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <div className="App">
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </div>
  );
}

export default App;
