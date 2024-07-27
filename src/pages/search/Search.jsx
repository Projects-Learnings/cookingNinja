import './Search.css'
import {useNavigate, useSearchParams} from "react-router-dom";
//import {useFetch} from "../../hooks/useFetch.jsx";
import RecipeList from "../../components/RecipeList.jsx";
import SpinnerLoader from "../../components/SpinnerLoader.jsx";
import {useEffect, useState} from "react";
import projectFirestore from "../../firebase/config.js";

const Search = () => {
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get('q');

    // const url = `https://checkitinvestments.com/recipes?q=${searchParam}`
    //console.log(url)


    //const {data, loading, error} = useFetch(url)
    //  console.log(data, loading, error)
    const navigate = useNavigate()


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // useEffect(() => {
    //     setLoading(true);
    //     projectFirestore.collection("recipes").get().then((data) => {
    //         let results = []
    //         data.docs.forEach(doc => {
    //
    //             results.push({id: doc.id, ...doc.data()})
    //         })
    //         setData(results)
    //         setLoading(false)
    //         //console.log(data)
    //     }).catch(Error => {
    //         setError(Error.message)
    //         setLoading(false)
    //     })
    // }, []);


    useEffect(() => {
        setLoading(true);
        const onSub = projectFirestore.collection("recipes").onSnapshot((data) => {
            let results = []
            data.docs.forEach(doc => {


                console.log(doc.data().title);
                if (doc.data().title.toLowerCase().includes(searchParam.toLowerCase()) || doc.data().method.toLowerCase().includes(searchParam.toLowerCase())) {
                    results.push({id: doc.id, ...doc.data()});
                }



                //results.push({id: doc.id, ...doc.data()})
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
            {/*{error &&*/}
            {/*    <div>No data found</div>}*/}

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