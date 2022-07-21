import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Navbar  from './component/Navbar';
import Home from './component/Home'
import './app.css'
import AddBook from './component/AddBook'
import UpdateBook from './component/updateBook'
import DeleteBook from './component/DeleteBook'

function App() {
  return (
    <div className="container">
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}>
        </Route>
      <Route path="/addBook" element={<AddBook></AddBook>}></Route>
      <Route path="/updateBook" element={<UpdateBook></UpdateBook>}></Route>
      <Route path="/deleteBook" element={<DeleteBook></DeleteBook>}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
