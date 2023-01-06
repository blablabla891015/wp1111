/****************************************************************************
  FileName      [ App.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the router ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import './css/App.css';

import { React, useState, useEffect } from 'react'
import NavBar from './components/navigationBar';
import SearchBar from './container/searchBar';

import Home from './container/Home'
import LogIn from './container/LogIn'
import SignUp from './container/SignUp'
import User from './container/User'
import Hub from './container/Hub'
import HubPage from './container/hubPage';

import DisplayWorks from './components/displayWorks';
import ArtistProfilePage from './container/ArtistprofilePage';
import MusicProfilePage from './container/MusicProfilePage';
import OpportunityProfilePage from './container/Opportunity';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoom from './container/ChatRoom'
import { UserProvider } from './container/hooks/useUser';
import OppModal from './components/oppModal';

function App() {
    return (
        <UserProvider>
            <Router>
            <NavBar visible={true} />
            <Routes>
            {/*<Route path="/" element={<SearchBar />} />*/}
                <Route path='/' element={
                    <Home />
                }/>
                <Route path='/About' element={
                    <Home />
                }/>
                <Route path='/LogIn' element={
                    <LogIn />
                }/>
                <Route path='/SignUp' element={
                    <SignUp />
                }/>
                <Route path='/HubPage/:id' element={
                    <HubPage />
                }/>
                <Route path='/Hub/:id' element={
                    <Hub />
                }/>
                <Route path='/User/:id' element={
                    <div>
                        <User />
                    </div>}
                />
                <Route path="/Browse" element={
                    <div>
                        <SearchBar />
                        {/* <DisplayWorks/> */}
                        
                    </div>
                } />
                <Route path="/search" element={
                    <div>
                        <SearchBar />
                        <DisplayWorks/>
                        
                    </div>
                } />
                {/* <Route path="/ArtistProfile/:id" element={
                    <div>
                        <ArtistProfilePage />
                        <DisplayWorks />
                    </div>
                }/>
                <Route path="/MusicProfile/:id" element={
                    <div>
                        <MusicProfilePage />
                        <DisplayWorks />
                    </div>
                }/>
                <Route path="/OpportunityProfile/:id" element={
                    <div>
                        <OpportunityProfilePage />
                        <DisplayWorks />
                    </div>
                }/> */}
                {/* <Route path='/Message' element={<ChatRoom />} /> */}
            </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
