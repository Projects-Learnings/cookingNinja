import React from "react";
import {useNavigate} from "react-router-dom";

const Searchbar = () => {
    const [term, setTerm] = React.useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${term}`);
    }
    return (
        <div className="Searchbar">
            <form onSubmit={handleSubmit}>
                {/*<label htmlFor="search">Search:</label>*/}
                <input type="text" id="search"
                       onChange={(e) => setTerm(e.target.value)}
                       value={term} placeholder="Search" required/>
            </form>
        </div>
    );
};

export default Searchbar;