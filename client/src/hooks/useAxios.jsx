import axios from "axios";
import { useEffect, useState } from "react"


const GET = "GET"
const POST = "POST"
const PATCH = "PATCH"
const PUT = "PUT"
const DELETE = "DELETE"
const METHODS = [GET, POST, PATCH, PUT, DELETE];

const useAxios = ({url = "", method="GET", payload={}, headers={}}) => {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [status_code, setStatusCode] = useState(null); 
  
    async function fetchData(){
        try {
            if (!METHODS.includes(method.toUpperCase())){
                throw new Error("Invalid method")   
            }
            
            let response = {};
            if (method.toUpperCase() === GET){
                response = await axios.get(url, {headers: headers});
            } 
            else if (method.toUpperCase() === POST) {
                response = await axios.post(url, payload, {headers: headers});
            } 
            else if (method.toUpperCase() === PUT) {
                response = await axios.put(url, payload, {headers: headers});
            }
            else if (method.toUpperCase() === PATCH) {
                response = await axios.patch(url, payload, {headers: headers});
            }
            else if (method.toUpperCase() === DELETE) {
                response = await axios.delete(url, {headers: headers});
            }
            setData(response.data);
            setStatusCode(response.status);
        } catch (error) {
            console.err(error);
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])
    
    return {
        data,
        status_code,
        loading,
        error
    }
}

export default useAxios