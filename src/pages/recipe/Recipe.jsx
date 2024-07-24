import './Recipe.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useFetch} from "../../hooks/useFetch.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import {useTheme} from "../../hooks/useTheme.jsx";

const Recipe = () => {
    const {id} = useParams();
    const {data, loading, error} = useFetch("http://localhost:3000/recipes/" + id.toString())
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            // Navigate to a new route
            //navigate(-1); //go back
            setTimeout(() => {
                navigate('/');
            }, 4000)

        }
    }, [error, navigate]);

    const formatMethod = (method) => {
        if (typeof method !== 'string') return [];

        // Check if the method is already numbered
        if (/^\d+\.?\s/.test(method)) {
            return method.split(/\d+\.?\s/).filter(step => step.trim() !== '');
        }
        // Check if the method is comma-separated
        else if (method.includes(',')) {
            return method.split(',').map(step => step.trim()).filter(step => step !== '');
        }
        // If it's neither, split by newlines
        else {
            return method.split('\n').filter(step => step.trim() !== '');
        }
    };

    const {mode} = useTheme()


    return (
        <div className="recipe">
            {loading &&
                <div>
                    <div className="loader"><SpinnerLoader/></div>
                </div>}
            {error && data && <div className="recipet"><p>{data.error}</p></div>}
            {error && !data && <div className="recipe"><p>We could not fetch the data</p></div>}

            {!data &&
                <div className={`recipe ${mode}`}>No data found</div>}

            {data && !loading && !error &&
                <>
                    <h2 className="page-title">{data.title}</h2>
                    <p>{data.cookingTime} to make</p>
                    <ul>
                        {
                            data.ingredients.map(ingredient =>
                                <li key={ingredient}>{ingredient}</li>
                            )
                        }
                    </ul>
                    <div className="method">
                        <h3>Cooking Method:</h3>
                        <ol>
                            {formatMethod(data.method).map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <NavLink to="/">Go Home ↑</NavLink>
                </>


            }
        </div>
    );
};

export default Recipe;