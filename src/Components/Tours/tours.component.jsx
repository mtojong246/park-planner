import './tours.styles.scss';
import { useState, useEffect } from 'react';
import Card from '../Card/card.component';

const Tours = ({parkData}) => {
    const [ tours, setTours ] = useState([]);
    const [ shownTours, setShownTours ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ expand, setExpand ] = useState('Expand');

    useEffect(() => {
        const fetchThingsToDo = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/tours?parkCode=${parkData[0].parkCode}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`);
            const data = await response.json();
            setTours(data.data);
            setShownTours(data.data.slice(0,3));
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
            setShownTours(tours);
        } else {
            setExpand('Expand');
            setShownTours(tours.slice(0,3));
        }
    }

    return (
        <>
        {isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='tours-container'>
                <div className='tours'>
                    <span>Tours</span>
                    <button value={expand} onClick={onClickHandler}>{expand}</button>
                </div>
                <div className='tours-grid'>
                {shownTours.map(tour => (
                    <div className='tours-card-container' key={tour.id}>
                        <Card image={tour.images[0].url} name={tour.title} description={tour.description}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        </>
    )
}

export default Tours;