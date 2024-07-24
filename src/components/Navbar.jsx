import './Navbar.css'
import {Link} from "react-router-dom";
import Searchbar from "./Searchbar.jsx";
import {useTheme} from "../hooks/useTheme.jsx";

const Navbar = () => {
    const {color} = useTheme()
    return (
        <div className="navbar" style={{backgroundColor: color}}>
            <nav className="nav">
                <Link to="/" className="brand"><h1>Cooking Ninja</h1></Link>
                <Searchbar/>
                <Link to="/create"><h1>create</h1></Link>
            </nav>
        </div>
    );
};

export default Navbar;