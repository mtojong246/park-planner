import './campgrounds.styles.scss';
import { useState, useEffect } from 'react';
import Card from '../Card/card.component';

const Campgrounds = ({parkData}) => {
    const [ campgrounds, setCampgrounds ] = useState([]);
    const [ shownCampgrounds, setShownCampgrounds ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ expand, setExpand ] = useState('Expand');

    useEffect(() => {
        const fetchThingsToDo = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkData[0].parkCode}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`);
            const data = await response.json();
            setCampgrounds(data.data);
            setShownCampgrounds(data.data.slice(0,3));
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
            setShownCampgrounds(campgrounds);
        } else {
            setExpand('Expand');
            setShownCampgrounds(campgrounds.slice(0,3));
        }
    }

    return (
        <>
        {isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='campgrounds-container'>
                <div className='campgrounds'>
                    <span>Campgrounds</span>
                    <button value={expand} onClick={onClickHandler}>{expand}</button>
                </div>
                <div className='campgrounds-grid'>
                {shownCampgrounds.map(campgrounds => (
                    <div className='campgrounds-card-container' key={campgrounds.id}>
                        <Card image={campgrounds.images[0].url} name={campgrounds.title} description={campgrounds.description}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        </>
    )
}

export default Campgrounds;