import React, {useEffect, useState} from 'react'
import axios from 'axios'

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

    <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
    <div class="px-2">    
    <form className="justify-content-center">
        <input onChange={handleSearch} type="text" placeholder = "Type here to Search" className = "col-auto my-1"/>
        <button onClick={handleSubmit} type="submit" className = "btn btn-primary col-auto my-1">Search</button>
    </form>
    </div>
    </div>

    <div className="title">Top Trending GIFs</div>
    <div className="container gifs">
        {renderGIFs()}
        </div>
    </div>
    )

}

export default Giphy