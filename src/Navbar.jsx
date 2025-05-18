import {Link} from 'react-router-dom';
import NewsPage from './NewsPage';
function Navbar() {
    return(
        <div>
            <nav className="navbar">
                <div className="navbar-logo">📰 NewsHub</div>
                <ul className="navbar-links">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/international">WORLD</Link></li>
                    <li><Link to="/india">NATIONAL</Link></li>
                    <li><Link to="/sports">SPORTS</Link></li>
                    <li><Link to="/business">BUSINESS</Link></li>
                    <li><Link to="/technology">TECHNOLOGY</Link></li>
                    <li><Link to="/entertainment">ENTERTAINMENT</Link></li>
                    <li><Link to="/science">SCIENCE</Link></li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar