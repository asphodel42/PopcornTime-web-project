import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <div className="bg-surface-a0 h-screen flex flex-col items-center justify-center">
      <h1
        className="text-5xl font-bold text-primary-a0"
        onClick={() => toast.success("Hello")}
      >
        PopcornTime
      </h1>
      <ToastContainer />
    </div>
  );
}

export default App;
