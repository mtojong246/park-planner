import './places-to-see.styles.scss';
import { useState, useEffect } from 'react';
import Card from '../Card/card.component';

const PlacesToSee = ({parkData}) => {
    const [ places, setPlaces ] = useState([]);
    const [ shownPlaces, setShownPlaces ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ expand, setExpand ] = useState('Expand');

    useEffect(() => {
        const fetchThingsToDo = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/places?parkCode=${parkData[0].parkCode}&limit=50&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`);
            const data = await response.json();
            setPlaces(data.data);
            setShownPlaces(data.data.slice(0,3));
        }
        
        if (parkData.length !== 0) {
            fetchThingsToDo();
            setIsLoading(false);
        } else {
            return;
        }

    }, [parkData]);

    const onClickHandler = (event) => {
        if (event.target.value === 'Expand') {
            setExpand('Collapse');
            setShownPlaces(places);
        } else {
            setExpand('Expand');
            setShownPlaces(places.slice(0,3));
        }
    }

    return (
        <>
        {isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='places-to-see-container'>
                <div className='places-to-see'>
                    <span>Places To See</span>
                    <button value={expand} onClick={onClickHandler}>{expand}</button>
                </div>
                <div className='places-to-see-grid'>
                {shownPlaces.map(place => (
                    <div className='places-card-container' key={place.id}>
                        <Card image={place.images[0].url} name={place.title} description={place.listingDescription}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        </>
    )
}

export default PlacesToSee;