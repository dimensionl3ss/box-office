import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
    const [input, setInput] = useState('');
    const onInputChange = ev => {
        setInput(ev.target.value);
    }; 
    const onSearch = ev => {
 
        //to recieve data from external source or any other source we need to call browser api (fetch)
        //it allows us to fetch the remote data
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then(r => r.json()) // return promise recieved in raw structure, convert it into json format
        .then(result => {
            console.log(result); // recieve the result
        });
    };
    const onKeyDown = (ev) => {
        if(ev.keyCode === 13) {
            onSearch();
        }
    };
    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value = {input}/>
            <button type="button" onClick={onSearch} >Search</button>
        </MainPageLayout>
    );
}; 
export default Home;