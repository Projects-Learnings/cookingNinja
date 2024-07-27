import './Create.css'
import {useEffect, useRef, useState} from "react";
//import {useFetch} from "../../hooks/useFetch.jsx";
import LoadingSpinner from "../../components/SpinnerLoader.jsx";
import {useNavigate} from "react-router-dom";
import projectFirestore from "../../firebase/config.js";

const Create = () => {

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [ingredients, setNewingredients] = useState([])
    const [newIngredient, setNewIngredient] = useState('')
    //const {postData, data, error, loading} = useFetch("https://checkitinvestments.com/recipes", 'POST')
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(title, method, cookingTime, ingredients)
        try {
            setLoading(true)
            await projectFirestore.collection("recipes").add({
                title,
                ingredients,
                method,
                cookingTime: cookingTime + " minutes"
            })
            setLoading(false)
            navigate('/');

        } catch (e) {
            console.log(e)
            setError(e.message)
            setLoading(false)
            navigate('/');
        }

        // postData({title, ingredients, method, cookingTime: cookingTime + " minutes"})

    }
    const ingredientInput = useRef(null)
    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()
        if (ing && !ingredients.includes(ing)) {
            // ingredients.push(ing)
            setNewingredients(prevState => [...prevState, ing])
            setNewIngredient('')
            ingredientInput.current.focus()
        }
    }

    // useEffect(() => {
    //     if (data) {
    //         navigate('/');
    //     }
    // }, [data]);

    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input type="text" onChange={(e) => {
                        setTitle(e.target.value)
                    }} value={title} required/>
                </label>
                <label><span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input type="text"
                               onChange={(e) => setNewIngredient(e.target.value)}
                               value={newIngredient}
                               ref={ingredientInput}
                        />
                        <button className="btn" onClick={handleAdd}>add</button>
                    </div>

                </label>
                <p>Current Ingredients: {ingredients && ingredients.map((e) => <em key={e}>{e}, </em>)}</p>
                <label><span>Recipe method:</span>
                    <textarea onChange={(e) => {
                        setMethod(e.target.value)
                    }} value={method}
                              required/>

                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input type="number" onChange={(e) => {
                        setCookingTime(e.target.value)
                    }} value={cookingTime}
                           required/>

                </label>
                <button className="btn">submit</button>


            </form>
            <div>
                {/*{data && <div>{data}</div>}*/}
                {error && <div>{error}</div>}
                {loading && <LoadingSpinner/>}
            </div>

        </div>
    );
};

export default Create;