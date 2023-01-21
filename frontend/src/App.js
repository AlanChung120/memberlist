import 'bulma/css/bulma.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddMember from "./AddMember";
import EditMember from './EditMember';
import ShowMember from './ShowMember';

function App() {
  return (
    <Router>
        <div className="column is-three-fifths is-offset-one-fifth">
          <Routes>
            <Route exact path="/" element={<ShowMember />} />
            <Route exact path="/add" element={<AddMember />} />
            <Route exact path="/edit/:id" element={<EditMember />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
