import './Home.css'
import {useFetch} from "../../hooks/useFetch.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import RecipeList from "../../components/RecipeList.jsx";

const Home = () => {
    const {data, loading, error} = useFetch("http://localhost:3000/recipes")
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