import Navbar from "./Navbar.jsx"
import './Navbar.css'
import './HomePage.css'
import HomePage from "./HomePage.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NewsPage from "./NewsPage.jsx"
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/:category" element={<NewsPage></NewsPage>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
