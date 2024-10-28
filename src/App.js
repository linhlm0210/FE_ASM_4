import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ListStudents from "./pages/ListStudents";
import UpdateStudent from "./pages/UpdateStudent";
import CreateStudent from "./pages/CreateStudent";
import HeaderLayout from "./components/HeaderLayout"; // Nhập HeaderLayout
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HeaderLayout />}>
          <Route path="students" element={<ListStudents />} />
          <Route path="students/:id/update" element={<UpdateStudent />} />
          <Route path="students/create" element={<CreateStudent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
