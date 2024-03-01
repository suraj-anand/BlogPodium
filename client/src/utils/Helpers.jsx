export function Logout (setAuthStatus){
    if(setAuthStatus){
        setAuthStatus(false);
    }
    localStorage.clear();
    sessionStorage.clear()
}