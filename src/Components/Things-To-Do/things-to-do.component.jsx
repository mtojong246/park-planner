import './things-to-do.styles.scss';
import Card from '../Card/card.component';
import { useState, useEffect } from 'react';

const ThingsToDo = ({parkData}) => {
    const [ things, setThings ] = useState([]);
    const [ shownThings, setShownThings ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ expand, setExpand ] = useState('Expand');

    useEffect(() => {
        const fetchThingsToDo = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkData[0].parkCode}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`);
            const data = await response.json();
            setThings(data.data);
            setShownThings(data.data.slice(0,3));
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
            setShownThings(things);
        } else {
            setExpand('Expand');
            setShownThings(things.slice(0,3));
        }
    }

    return (
        <>
        {isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='things-to-do-container'>
                <div className='things-to-do'>
                    <span>Things To Do</span>
                    <button value={expand} onClick={onClickHandler}>{expand}</button>
                </div>
                <div className='things-to-do-grid'>
                {shownThings.map(thing => (
                    <div className='things-card-container' key={thing.id}>
                        <Card image={thing.images[0].url} name={thing.title} description={thing.shortDescription}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        </>
    )
}

export default ThingsToDo;