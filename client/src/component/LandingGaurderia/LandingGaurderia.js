import React from 'react'
import Header from '../header/Header'
import VideoPlayer from "react-background-video-player";

import './LandingGuarderia.css'


export default function LandingGaurderia() {
    return (
        <div className="App">

            <VideoPlayer
                className="video"
                src={
                    "https://player.vimeo.com/external/435674703.sd.mp4?s=01ad1ba21dc72c1d34728e1b77983805b34daad7&profile_id=165&oauth2_token_id=57447761"
                }

                autoPlay={true}
                muted={true}
            />
            <div className="mainInput">
                <h1>Amigo Fiel-Guarderia De Mascotas</h1>
                <Header />
            </div>
        </div>
    )
}
