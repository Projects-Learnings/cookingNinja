import './ThemeSelector.css'
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext.jsx";
import modeIcon from "../assets/mode-icon.svg";
import {useTheme} from "../hooks/useTheme.jsx";

const themColors = ["#58249c", "#249c6b", "#b70233"]

const ThemeSelector = () => {
    const {changeColor,changeMode} = useContext(ThemeContext);
    const {mode} = useTheme()
    const toggleMode = () => {
        changeMode(mode === "dark" ? "light" : "dark");

    }
    console.log(mode)
    return (
        <div className="Theme-Selector">
            <div className="mode-toggle">
                <img src={modeIcon} alt="Theme Selector"
                     onClick={toggleMode}
                style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
                />
            </div>
            <div className="theme-buttons">
                {themColors.map(color => (
                    <div key={color}
                         onClick={() => {
                             changeColor(color)
                         }}
                         style={{background: color}}
                    />
                ))}

            </div>
        </div>
    );
};

export default ThemeSelector;