import './home.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Card from '../../Components/Card/card.component';
import { useEffect, useState } from 'react';

const Home = () => {
    const [ parkData, setParkData ] = useState([]);
    const [ pages, setPages ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ displayedPage, setDisplayedPage ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {

        const fetchParkData = async () => {
            const response = await fetch('https://developer.nps.gov/api/v1/parks?stateCode=&limit=15&start=15&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm');
            const data = await response.json();

            const totalPages = Math.ceil(data.total/15);
            const pagesArray = Array.from(Array(totalPages).keys());
            const filteredArray = pagesArray.filter(page => page !== 0)
            setPages(filteredArray);
            setDisplayedPage(filteredArray.slice(0,10))
            setCurrentPage(1);
            setParkData(data.data);
            setIsLoading(false);

        }
        fetchParkData();
    }, [])

    const pageNumber = async (event) => {
        setIsLoading(true);
        const response = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=&limit=15&start=${Number(event.target.value)*15}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`)
        const data = await response.json();
        setParkData(data.data);
        setCurrentPage(Number(event.target.value));
        setIsLoading(false);
    }

    const nextPage = async () => {
        setIsLoading(true);
        const response = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=&limit=15&start=${(currentPage+1)*15}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`)
        const data = await response.json();
        setParkData(data.data);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);

        if (!displayedPage.includes(currentPage+1)) {
            const addPage = displayedPage.concat(pages[currentPage]);
            const removePage = addPage.splice(1,10);
            setDisplayedPage(removePage);
        }
    }

    const prevPage = async () => {
        setIsLoading(true);
        const response = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=&limit=15&start=${(currentPage-1)*15}&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm`)
        const data = await response.json();
        setParkData(data.data);
        setCurrentPage(currentPage - 1);
        setIsLoading(false);

        if (!displayedPage.includes(currentPage-1)) {
            const addPage = [pages[currentPage-2]].concat(displayedPage);
            const removePage = addPage.splice(0,10);
            setDisplayedPage(removePage);
        }
    }

    return (
        <>  
            <div className='home-overlay'></div>
            <div className='home-container'>
                <div className='home-filter-container'>
                    <span>National Parks</span>
                    <p>Explore America’s national parks. Discover our most treasured places, supported by people like you, and start your travel planning here by finding your park.</p>
                    <div className='search-for-national-park'>
                        <div className='search-placeholder'>
                            <span>Search for a national park</span>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                    </div>
                    <div className='select-state'>
                    <div className='search-placeholder'>
                            <span>Or select a state...</span>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                    </div>
                    <p id='clear-filter'>Clear Filter</p>
                </div>
            </div>
            <div className='home-results-container'>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className='home-results-grid'>
                    {parkData.map(data => (
                        <Card key={data.url} image={data.images[0].url} name={data.fullName} description={data.description}/>
                    ))}
                    </div>
                    <div className='home-results-pagination'>
                        <button style={{display: `${currentPage !== 1 ? 'inline-block' : 'none'}`}} onClick={prevPage}><FontAwesomeIcon icon={faChevronLeft} id='prev'/>Previous</button>
                        {displayedPage.map(num => (
                            <button key={num} value={num} onClick={pageNumber} className={`${currentPage === num ? 'selected' : 'deselected'}`}>{num}</button>
                        ))}
                        <button style={{display: `${currentPage !== pages.length ? 'inline-block' : 'none'}`}} onClick={nextPage}>Next<FontAwesomeIcon icon={faChevronRight} id='next'/></button>
                    </div>
                </>
            )}
            </div>
        </>
    )
    
}

export default Home;