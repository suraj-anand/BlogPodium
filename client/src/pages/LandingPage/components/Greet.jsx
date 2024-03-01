import { AuthContext } from "context/AuthContext";
import { useContext } from "react";

const Greet = () => {

    const { name } = useContext(AuthContext)
    
    function getGreeting(){
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Good morning';
        } else if (currentHour >= 12 && currentHour < 16) {
            return 'Good afternoon';
        } else {
            return 'Good Evening';
        }
        }
  
    return (
        <>
        <h1 className="text-center text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                {getGreeting()} {name} !!
            </span>
        </h1>
        </>
  )
}

export default Greet