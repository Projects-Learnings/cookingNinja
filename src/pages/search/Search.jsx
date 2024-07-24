import './Search.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch.jsx";
import RecipeList from "../../components/RecipeList.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import {useEffect} from "react";

const Search = () => {
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get('q');

    const url = `http://localhost:3000/recipes?q=${searchParam}`
    console.log(url)


    const {data, loading, error} = useFetch(url)
    console.log(data, loading, error)
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            // Navigate to a new route
            //navigate(-1); //go back
            setTimeout(() => {
                navigate('/');
            }, 3000)

        }
    }, [error]);
    return (
        <div>
            {loading &&
                <div>
                    <div className="loader"><SpinnerLoader/></div>
                </div>}
            {error && <div className="error"><p>An error occurred</p></div>}
            {!data && !error &&
                <div>No data found</div>}

            {data &&
                <>
                    <div className="search-title"><h2>Recipes including &quot;{searchParam}&quot;</h2></div>
                    <RecipeList data={data}/>
                </>
            }
        </div>
    );
};

export default Search;