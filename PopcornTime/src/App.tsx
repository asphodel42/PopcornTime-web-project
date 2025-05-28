import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <>
      <div className="main bg-surface-a0 min-h-screen">
        <h1 className="text-3xl font-bold text-primary-a0">PopcornTime</h1>
        <div className="w-10/12 mx-auto movie-list grid gap-6 max-[490px]:grid-cols-1 max-[900px]:grid-cols-2 max-[1300px]:grid-cols-3 max-[1600px]:grid-cols-4 max-[1920px]:grid-cols-5 min-[1920px]:grid-cols-6 max-w-500"></div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
