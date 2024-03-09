import { useNavigate } from "react-router-dom";

export function Logout (setAuthStatus, navigate){
    if(setAuthStatus){
        setAuthStatus(false);
    }
    localStorage.clear();
    localStorage.clear();
    navigate("/");
}