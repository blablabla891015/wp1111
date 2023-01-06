import '../css/home.css';
import React from 'react';
// import { BsFileEarmarkPerson } from 'react-icon/bs';

const Home = () => {

    // image file names; stored in frontend/src/img/home/
    const img_names = ['harryStyles','jvke','postMalone','sia','ariana','blackpink','childishGambino', 'eve'];

    return (
        <div class="home">
            <div class="home_section" id="home_section1">
                <p id="home_section1_text1">Create different.</p>
                <div id="home_section1_slider_container">
                    {   // images have to be placed repeatedly to yield carousel effect
                        // images once
                        img_names.map((name, idx) => {
                            return(
                                <div class="home_section1_slider">
                                        <img src={require('../img/home/'+name+'.png')} alt={'image'+idx}/>
                                </div>
                            )
                        })
                    }
                    {   // images twice (same)
                        img_names.map((name, idx) => {
                            return(
                                <div class="home_section1_slider">
                                        <img src={require('../img/home/'+name+'.png')} alt={'image'+idx}/>
                                </div>
                            )
                        })
                    }
                    {   // images thrice (same)
                        img_names.map((name, idx) => {
                            return(
                                <div class="home_section1_slider">
                                        <img src={require('../img/home/'+name+'.png')} alt={'image'+idx}/>
                                </div>
                            )
                        })
                    }
            </div>
            </div>
            <div class="home_section home_section2" id="home_section2">
                    <div class="text_box21">
                        <h1>mustopia</h1>
                        <h2>where both creative and analytical minds can thrive</h2>    
                    </div>
                    
                    <p>Mustopia is a full-service creative platform built to connect aritsts around the world.
                    Fuelled by our passion and insights for music, we help our clients break boundaries by 
                    creating an intuitive social platform for artist networking. 
                    </p>
            </div>
            <div></div>
            <div class="home_section home_section3" id="home_section3">
                    <div class="text_box31">
                        <h1>How We Connect</h1>
                    </div>
                    <div class="text_box31">
                        <div class="text_box311">
                            <h4>Intuitive Personal Framework</h4>
                            <p>Show off your personal accomplishments with our intuitive personal profile framework.
                            Wow the crowd with you music, skills, experiences with a few clicks.</p>
                        </div>
                        <div class="text_box311">
                            <h4>For both seeking and hiring</h4>
                            <p>Looking for a drummer for your new holiday project? Seeking to freelance as a pianist?
                            Be both a provider and a seeker with one single account.</p>
                        </div>
                        <div class="text_box311">
                            <h4>A Team Workplace</h4>
                            <p>Checkout our hubpage built deliberately to boos team productivity. Post anyplace, anytime.
                            Form meaningful conversations with our markdown posting features.</p>
                        </div>
                    </div>
                    
            </div>
            <div class="home_section home_section2" id="home_section2">
                    <div class="text_box21">
                        <h1>Our Vision</h1>  
                        <h3>Unlike most job-seeking platforms, we focus on creating a hub for aspiring artists, freelancers, start-ups, 
                        and hobbists like you and me. Professional or not, big or small, everyone has something to bring to the table.</h3>  
                    </div>
            </div>
            <div></div>
            <div class="home_section home_section4" id="home_section3">
                    <div class="text_box32">
                        <h1>Credits</h1>
                    </div>
                    <div class="text_box5">
                        <div class="text_box4">
                            <h4>Po Chieh, Yen</h4>
                            <p> Planned and directed the completion of the project.</p>
                            <p> Connected frontend and backend files to ensure the executability of the website as a whole.</p>
                            <p>Designed model files and their passings to optimize the speed and performance of the website.</p>
                        </div>
                        <div class="text_box4">
                            <h4>Ping Chen, Chiu</h4>
                            <p>Directed review and analysis for optimum workflow.</p>
                            <p>Researched potential resources and implemented them for makrdown language and file-uploading features.</p>
                            <p>Developed hub features to support inter-team reactions among users.</p>
                        </div>
                        <div class="text_box4">
                            <h4>Ya Chin, Hu</h4>
                            <p>Setting and scehduling phased tasks to align expectations.</p>
                            <p>Envisioned, devised, and built personal profile framework for intuitive user building, reading, and updating.</p>
                            <p>Drafted and executed Css styling files for optimizied user experience.</p>
                        </div>
                    </div>
                    <div class="text_box32"></div>
                    
            </div>
        </div>
    )
}
export default Home;