import './Home.css'
//import {useFetch} from "../../hooks/useFetch.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import RecipeList from "../../components/RecipeList.jsx";
import {useEffect, useState} from "react";
import projectFirestore from "../../firebase/config.js";

const Home = () => {
    //const {data, loading, error} = useFetch("https://checkitinvestments.com/recipes")
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        const onSub = projectFirestore.collection("recipes").onSnapshot((data) => {
            let results = []
            data.docs.forEach(doc => {

                results.push({id: doc.id, ...doc.data()})
            })
            setData(results)
            setLoading(false)
            //console.log(data)
        }, (err) => {
            console.log(err)
            setError(true)
            setLoading(false)
        })

        return () => onSub()


    }, []);

    return (
        <div className="Home">
            {loading &&
                <div>
                    <div className="loader"><SpinnerLoader/></div>
                </div>}
            {error && <div className="error"><p>An error occurred</p></div>}
            {!data && !error &&
                <div>No data found</div>}

            {data && !loading && !error && <RecipeList data={data}/>
            }
        </div>
    );
};

export default Home;

{/*<p className="author">Authored by {recipe.author}</p>*/
}

{/*<Link to={`/article/${article.id}`}>Read more →</Link>*/
}