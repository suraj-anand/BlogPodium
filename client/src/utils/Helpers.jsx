export function Logout (e, setAuthStatus){
    if(setAuthStatus){
        setAuthStatus(false);
    }
    localStorage.clear();
    sessionStorage.clear()
}