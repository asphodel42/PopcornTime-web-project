import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <>
      <div className="main bg-surface-a0 min-h-screen py-6">
        <h1 className="text-3xl font-bold text-primary-a0 text-center mb-6">
          PopcornTime
        </h1>
        <MovieGrid />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
