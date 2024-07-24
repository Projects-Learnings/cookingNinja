import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Create from "./pages/create/Create.jsx";
import Search from "./pages/search/Search.jsx";
import Recipe from "./pages/recipe/Recipe.jsx";
import Navbar from "./components/Navbar.jsx";
import {useEffect} from "react";
import ThemeSelector from "./components/ThemeSelector.jsx";
import {useTheme} from "./hooks/useTheme.jsx";

function App() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }, []);
    const {mode} = useTheme()

    return (
        <div className={`App ${mode}`}>
            <BrowserRouter>

                <Navbar/>
                <ThemeSelector/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/recipe/:id" element={<Recipe/>}/>
                    {/*<Route path="*" element={<Home/>}/>*/}
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
