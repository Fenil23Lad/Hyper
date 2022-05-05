import React, {useEffect, useState} from 'react'
import axios from 'axios'

// comment
const Giphy = () => {

    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        const fetchData = async() =>{
            setIsError(false);
            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: 'rzRgL1WG2ru4KODoWyP0tmS78lO4s0jL'
                    }
                });           
            console.log(results);
            setData(results.data.data);
            }
            catch(err){
                setIsError(true);
                setTimeout(()=> setIsError(false), 4000);
            }
        }
        fetchData();
    }, [])

    const renderGIFs = () =>{
        return data.map(el =>{
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url}></img>
                </div>
            )
        })
    }

    const error = () => {
        if(isError){
            return (<div className="alert alert-danger alert-dismissible fade show" role ="alert">
                Please try again later</div>)          
        }
    };

    const handleSearch = (event) =>{
        setSearch(event.target.value);
    }

    const handleSubmit = async event =>{
        event.preventDefault();
        setIsError(false);
        try{
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: 'rzRgL1WG2ru4KODoWyP0tmS78lO4s0jL',
                    q: search
                }
            });           
        console.log(results);
        setData(results.data.data);
        }
        catch(err){
            setIsError(true);
            setTimeout(()=> setIsError(false), 4000);
        }
    }
 

    return (    
    <div className="m-2">
        {error()}
        
    <form className="form-inline justify-content-center m-2">
        <input onChange={handleSearch} type="text" placeholder = "Search" className = "form-control"/>
        <button onClick={handleSubmit} type="submit" className = "btn btn-primary mx-8">Search</button>
    </form>
    
    <div className="container gifs">
        {renderGIFs()}
        </div>
    </div>
    )

}

export default Giphy