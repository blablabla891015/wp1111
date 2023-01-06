import React, { useEffect } from 'react'
import { useState } from "react";
import '../css/searchBar.css'
// import Filter from '../components/filter';
// import { MdTune, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

    const searchTypes = ['Musics','Artists','Opportunities'];  
    const style =           ['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday','Retro','Lounge',
                            'Blues','Soul &RnB','Funk', 'Latin','Country','Acoustic','Indie','Rap','Classical','Heavy Metal']
    const instrument =      ['Synth','Drums','Percussion','Guitar','Bass','KeyBoard','Vocals','Piano', 
                            'String','Woodwinds','Brass','Saxophone','Harmonica','BeatBox']
    const jobType =         ['Full Time', 'Part Time', 'Freelance', 'Intern']
    const jobSpecification= ['No Experience Required', 'No Degree Required', 'Work Online', 'Work From Home', 'Verified']
    const jobOccupation =   ['Music Producer','Recording Engineer', 'Session Musician',
                            'Artist Manager', 'Tour Manager', 'Music Teacher', 'Booking Agent', 'Music Publicist', 'Composer', 'Music Arranger',
                            'Accompanist', 'Background Singer', 'Band Director', 'Choir Director', 'Conductor', 'Cover Band', 'DJ', 'Drummer']
    
    const filterItems = {
        'Musics':           ['Style','Instrument'],
        'Artists':          ['Style','Instrument'],
        'Opportunities':    ['Type','Specification','Occupation']
    }
    const filterMap = {
        'Style' : style,
        'Instrument': instrument,
        'Type': jobType,
        'Specification': jobSpecification,
        'Occupation': jobOccupation
    }
    const sortMethods = {
        'Musics': ['random','ratings', 'views' ,'artist ratings','artist views','release date'],
        'Artists': ['random','ratings','views'],
        'Opportunities': ['random','views', 'payment']
    }  

    const [searchType, setSearchType] = useState(searchTypes[0]);                           // Serch type: [Musics, Artists, Opportunities]
    const [filter, setFilter] = useState([]);                                               // Filters selected
    const [action, setAction] = useState('ADD');                                            // User can potentially 'add' or 'remove' current onFilter
    const [filterCollection, setFilterCollection] = useState(filterItems[searchType][0])    // The filterCollection in use: [style, instrument, jobType, jobSpecificaion, jobOccupation]
    const [onFilter, setOnFilter] = useState(filterMap[filterCollection][0]);               // Filter item shown on page (DOES NOT MEAN ITS ADDED)
    const [sortMethod, setSortMethod] = useState(sortMethods[searchType][0]);               // Sorting Method

    const reset = () => {
        console.log('reset');
        setSearchType(searchTypes[0]);
        setFilter([]);
        setAction('ADD');
        setFilterCollection(filterItems[searchType][0]);
        setOnFilter(filterMap[filterCollection][0]);
        setSortMethod(sortMethods[searchType][0]);
    }

    /* Navigate toe searchPage when 'Search' is clicked */
    const navigate = useNavigate();
    const navigateToSearch = () => {
        console.log('filter',filter)
        navigate('/search', {
            state: {
                mode: 'search',
                searchType: searchType,
                filter: filter,
                sortMethod: sortMethod
            }
        });
        reset();
        // console.log('navigate to /search');
    };

    /* Drop filter item. Triggered when tag is clicked osr drop is selected from filterContainer */
    const dropFilterItem = (item) => {  
        console.log('rasdf');

        if(!filter.includes(item)){
            alert('FILTER ITEM DNE')
        }else{
            // console.log('pre:',filter);
            let newFilter = filter.filter(function(value){
                return (value !== item)
            })
            setFilter(newFilter)
            console.log('setFilter@dropFilterItem')
            // console.log('posts:',filter);
        }
    }

    /* Change 'add' to 'drop' or vise versa depending on whether item is added to filter. */
    const amendFilter = () => {
        if(action === 'ADD'){
            console.log('setFilter@amendFilter')
            setFilter([...filter,onFilter]);
        }else if(action === 'DROP'){
            dropFilterItem(onFilter)
        }
    }

    useEffect(() => {
        setOnFilter(filterMap[filterCollection][0]);
    }, [filterCollection])

    useEffect(() => {
        if (filter.includes(onFilter)){
            setAction('DROP');
        } else {
            setAction('ADD');
        }
    }, [onFilter,filter])
    
    useEffect(() => {
        setFilterCollection(filterItems[searchType][0]);
        setFilter([]);
        console.log('setFilter@useEffect')
    }, [searchType])
 

    return (
    
            <div className='searchBarContainer'>
                {/* Displays selected filter items */}
                <div className='searchBarTagContainer'>
                    {filter.map((item, idx) => {
                        if (idx < 7){
                            // console.log('hello world');
                            return(<div className='searchBarTagBlock' onClick={() => dropFilterItem(item)}><p>X</p><p>{item}</p></div>);
                        } else if (idx === 7){
                            return(<div className='searchBarTagBlock'><p>More...</p></div>)
                        }
                    })}
                </div>
                
                {/* Title and text section */}
                <div className='searchBarTitleContainer'>
                    <h1>Discover</h1>
                    <p>Explore musics, artists, and opportunities that you've been missing out on</p>
                </div>
                
                {/* Type selection, filter selection, sortMethod selection, and search button*/}
                <div className='functionRow'>

                    {/* SearchType */}
                    <div className='selectContainer'>
                        <select value={searchType} onChange={e => setSearchType(e.target.value)}>
                            {searchTypes.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Filter bar */}
                    <div className='filterContainer'>
                        <div className='filterBlock'>
                            <select value={filterCollection} onChange={e => setFilterCollection(e.target.value)}>
                                {filterItems[searchType].map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='filterBlock'>
                            <select value={onFilter} onChange={e => setOnFilter(e.target.value)}>
                                {filterMap[filterCollection].map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='filterAddDrop'>
                            <button onClick={amendFilter}>{action}</button>
                        </div>
                    </div>
                    
                    {/* SortMethod */}
                    {
                    //     <div className='selectContainer'>
                    //     <select value={sortMethod} onChange={e => setSortMethod(e.target.value)}>
                    //         {sortMethods[searchType].map((value) => (
                    //             <option value={value} key={value}>
                    //                 {value}
                    //             </option>
                    //         ))}
                    //     </select>
                    // </div>
                    }

                    {/* Search Button */}
                    <div className='searchContainer'>
                        <button onClick={navigateToSearch}>Search</button>
                    </div>
                </div>
            </div>
    
    )
}
export default SearchPage