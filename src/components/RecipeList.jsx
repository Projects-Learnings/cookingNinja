import './RecipeList.css'
import {Link, NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {useTheme} from "../hooks/useTheme.jsx";
import TrashCan from "../assets/trashcan.svg"
import projectFirestore from "../firebase/config.js";

const RecipeList = ({data}) => {
    const {mode} = useTheme()
    const handleClick = (id) => {
        projectFirestore.collection("recipes").doc(id).delete()
    }
    return (

        <div className="recipe-list">

            {data.length === 0 ? <div className="noData">
                    <p> Oops no data for your search</p>
                    <NavLink to="/">Go Home ↑</NavLink>
                </div> :

                data.map((recipe) => (
                    <div key={recipe.id} className={`card ${mode}`}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime} to make</p>
                        <div>{recipe.method.length > 100 ? recipe.method.substring(0, 100) + "..." : recipe.method}</div>
                        <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
                        <img src={TrashCan} alt="delete" className="delete"
                             onClick={() => handleClick(recipe.id)}/>
                    </div>
                ))}


        </div>

    );
};
RecipeList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
            method: PropTypes.string.isRequired,
            cookingTime: PropTypes.string.isRequired
        })
    ).isRequired
};

export default RecipeList;
