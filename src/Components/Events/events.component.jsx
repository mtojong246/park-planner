import './events.styles.scss';
import { useState, useEffect } from 'react';
import Card from '../Card/card.component';

const Events = ({parkData}) => {
    const [ events, setEvents ] = useState([]);
    const [ shownEvents, setShownEvents ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ expand, setExpand ] = useState('Expand');

    useEffect(() => {
        const fetchThingsToDo = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkData[0].parkCode}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`);
            const data = await response.json();
            setEvents(data.data);
            setShownEvents(data.data.slice(0,3));
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
            setShownEvents(events);
        } else {
            setExpand('Expand');
            setShownEvents(events.slice(0,3));
        }
    }

    return (
        <>
        {isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='events-container'>
                <div className='events'>
                    <span>Upcoming Events</span>
                    <button value={expand} onClick={onClickHandler}>{expand}</button>
                </div>
                <div className='events-grid'>
                {shownEvents.map(event => (
                    <div className='events-card-container' key={event.id}>
                        <Card image={`${event.images.length === 0 ? '' : 'https://www.nps.gov' + event.images[0].url}`} name={event.title} description={event.description}/>
                    </div>
                ))}
                </div>
            </div>
        )}

        </>
    )
}

export default Events;