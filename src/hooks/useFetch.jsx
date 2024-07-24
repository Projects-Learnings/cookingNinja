import {useEffect, useState} from "react";


export const useFetch = (url, method = "GET") => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const controller = new AbortController();
    const [options, setOptions] = useState(null);
    //const signal = controller.signal;
    //const options = useRef(method).current

    const postData = (postData) => {
        setOptions({
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
            credentials: "include",
        })
    }
    useEffect(() => {
        console.log(options)
        const fetchData = async (fetchOptions,method) => {
            setLoading(true)
            try {
                //const response = await fetch(url, {signal});
                let response
                if (method === "GET") {
                    response = await fetch(url, {
                        method: 'GET',
                        credentials: 'include',
                        signal: controller.signal,
                    });
                } else {
                    response = await fetch(url, {
                        ...fetchOptions,
                        //signal: controller.signal,
                    })
                }


                if (!response.ok) {
                    // throw new Error("Could not fetch data." + response.statusText);
                    setError(true)
                }

                const result = await response.json();
                setLoading(false)
                // console.log(response)
                setData(result)
            } catch (e) {
                console.log(e.message)
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted');
                    setLoading(false)
                    setError(setError)
                } else {
                    console.error('Fetch error:', error);
                    setLoading(false)
                }


                // if (e.name === "AbortError") {
                //     console.log("Fetch request was aborted")
                //     setLoading(false)
                //     setError(setError)
                // } else {
                //     setLoading(false)
                //     setError(setError)
                // }

            }


        }

        if (method === "GET") {
            fetchData()
        }
        if (method === "POST" && options) {
            fetchData(options)
        }

        return () => {
            controller.abort()
        }
    }, [url, options, method]);
    return {data, loading, error, postData}
}
//export default useFetch;