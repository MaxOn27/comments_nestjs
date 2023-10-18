import './App.css';
import CreateComment from "./components/createComment";
import GetComments from "./components/getComments";
function App() {

  return (
    <div className="App">
      <CreateComment/>
      <GetComments/>
    </div>
  );
}

export default App;
