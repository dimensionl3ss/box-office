import React, { useState } from 'react'
import ActorGrid from '../actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';
import ShowGrid from '../show/ShowGrid';
const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowSearch = searchOption === 'shows';
    const onInputChange = ev => {
        setInput(ev.target.value);
    }; 
    const onSearch = ev => {
        
        apiGet(`/search/${searchOption}?q=${input}`)
        .then(result => {
            setResults(result); 
            console.log(result);// recieve the result
        });
    };
    const onKeyDown = (ev) => {
        if(ev.keyCode === 13) {
            onSearch();
        }
    };

    const renderResults = () => {
        if(results && results.length === 0) {
            return <div>No Results</div>
        }

        if(results && results.length > 0) {
            return results[0].show 
            ? <ShowGrid data ={results} />
            : <ActorGrid data={results}/>
        }
        return null;
    }
    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }
    return (
        <MainPageLayout>
            <input 
                type="text" 
                placeholder ="search for something"
                onChange={onInputChange} 
                onKeyDown={onKeyDown} value = {input}
            />
            <div>
                <label htmlFor = "shows-search">Shows
                    <input 
                        id = "shows-search" 
                        type="radio" value="shows" 
                        checked = {isShowSearch}
                        onChange={onRadioChange}
                    />
                </label>
                <label htmlFor="actors-search">
                    Actors
                    <input 
                        id = "actors-search" 
                        type="radio" 
                        value="people" 
                        checked = {!isShowSearch}
                        onChange={onRadioChange}
                    />
                </label>
            </div>
            <button type="button" onClick={onSearch} >Search</button>
            {renderResults()}
        </MainPageLayout>
    );
}; 
export default Home;