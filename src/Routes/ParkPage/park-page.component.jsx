import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './park-page.styles.scss';
import ThingsToDo from '../../Components/Things-To-Do/things-to-do.component';
import PlacesToSee from '../../Components/Places-To-See/places-to-see.component';
import Tours from '../../Components/Tours/tours.component';
import Campgrounds from '../../Components/Campgrounds/campgrounds.component';
import Events from '../../Components/Events/events.component';
import General from '../../Components/General-Info/general-info.component';
import Map from '../../Components/Map/map.component';

const ParkPage = () => {
    const { park } = useParams();
    const [ parkData, setParkData ] = useState([]);

    const array = [];
    const parks = (park.replace(/-/g, ' ')).split(' ');
    
    for (let i=0; i<parks.length; i+=1) {
        const capitalize = parks[i][0].toUpperCase() + parks[i].substr(1);
        array.push(capitalize);
    }

    const parkName = (array.join()).replace(/,/g, " ");

    useEffect(() => {
        const allParks = JSON.parse(localStorage.getItem('parks'));
        const thisPark = allParks.filter(park => park.fullName === parkName);
        setParkData(thisPark);
    }, [parkName])

 
    return (
        <>
        {parkData.length === 0 ? (
            <h1>Loading...</h1>
        ) : (
            <>
                <div className='park-image-overlay'></div>
                <div className='park-image-container' style={{backgroundImage: `url(${parkData[0].images[0].url})`}}>
                    <span>{parkName}</span>
                </div>
                <div className='park-page-container'>
                    <div className='park-description-container'>
                        <p>{parkData[0].description}</p>
                    </div>
                    <General parkData={parkData}/>
                    <Map parkData={parkData}/>
                    <ThingsToDo parkData={parkData}/>
                    <PlacesToSee parkData={parkData} />
                    <Tours parkData={parkData} />
                    <Campgrounds parkData={parkData} />
                    <Events parkData={parkData} />
                </div>
            </>
        )}
        </>
    )
}

export default ParkPage;