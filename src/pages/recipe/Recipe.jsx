import './Recipe.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
//import {useFetch} from "../../hooks/useFetch.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import {useTheme} from "../../hooks/useTheme.jsx";
import projectFirestore from "../../firebase/config.js";

const Recipe = () => {
    const {id} = useParams();
    //const {data, loading, error} = useFetch("https://checkitinvestments.com/recipes/" + id.toString())
    const navigate = useNavigate()

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        const onSub = projectFirestore.collection("recipes").doc(id).onSnapshot((data) => {
                // let results = []
                console.log(data.id, data.data())
                // data.docs.forEach(doc => {
                //
                //     results.push({id: doc.id, ...doc.data()})
                // })
                setData({id: data.id, ...data.data()})
                setLoading(false)
                //console.log(data)
            }, (err) => {
                console.log(err)
                setError(true)
                setLoading(false)
            }
        )
        return () => onSub()
    }, []);

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

    const handleUpdate = () => {
        projectFirestore.collection("recipes").doc(id).update({
            method: data.method + " Serve with cold beverage"
        }).then((data) => {
            setData(data)
        }).catch(Error => {
            console.log(Error.message)
            setError(error)
        })
    }


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
                    <button onClick={handleUpdate}>Update Me</button>
                    <NavLink to="/">Go Home ↑</NavLink>
                </>


            }
        </div>
    );
};

export default Recipe;