import './home.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Card from '../../Components/Card/card.component';
import { useEffect, useState } from 'react';
import SearchDropdown from '../../Components/Search-Dropdown/search-dropdown.component';
import { states } from '../../Data/state-data';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [ parkData, setParkData ] = useState([]);
    const [ allData, setAllData ] = useState([]);
    const [ pages, setPages ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ displayedPage, setDisplayedPage ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ isStateOpen, setIsStateOpen ] = useState(false);
    const [ park, setPark ] = useState('Search for a national park');
    const [ state, setState ] = useState('Or select a state...');

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleState = () => setIsStateOpen(!isStateOpen);

    useEffect(() => {

        const fetchParkData = async () => {
            const response = await fetch('https://developer.nps.gov/api/v1/parks?limit=469&api_key=PwJwUrRAt4v15g0483aMN8ct1PWZTAVfAc0BSqjm');
            const data = await response.json();
            localStorage.setItem('parks', JSON.stringify(data.data));

            const totalPages = Math.ceil(data.total/15);
            const pagesArray = Array.from(Array(totalPages).keys());
            const filteredArray = pagesArray.filter(page => page !== 0)
            setPages(filteredArray);
            setDisplayedPage(filteredArray.slice(0,10))
            setCurrentPage(1);

            const chunkSize = 15;
            const array = [];

            for (let i=0; i<data.data.length; i+=chunkSize) {
                const chunk = data.data.slice(i, i+chunkSize);
                array.push(chunk);
            }
            
            setAllData(array);
            setParkData(array[0])
            setIsLoading(false);

        }
        fetchParkData();
    }, [])

    const pageNumber = (event) => {
        setParkData(allData[Number(event.target.value)]);
        setCurrentPage(Number(event.target.value));
    }

    const nextPage = () => {
        setParkData(allData[currentPage + 1]);
        setCurrentPage(currentPage + 1);

        if (!displayedPage.includes(currentPage+1)) {
            const addPage = displayedPage.concat(pages[currentPage]);
            const removePage = addPage.splice(1,10);
            setDisplayedPage(removePage);
        }
    }

    const prevPage = () => {
        setParkData(allData[currentPage - 1]);
        setCurrentPage(currentPage - 1);

        if (!displayedPage.includes(currentPage-1)) {
            const addPage = [pages[currentPage-2]].concat(displayedPage);
            const removePage = addPage.splice(0,10);
            setDisplayedPage(removePage);
        }
    }

    const onClickHandler = (event) => {
        if ((allData.flat().map(data => data.fullName)).includes(event.currentTarget.value)) {
            setPark(event.currentTarget.value);
            toggleDropdown();
            goToPage(event.currentTarget.value);
        } else {
            setState(event.currentTarget.value)
            toggleState();
        }
    }

    const clearFilter = () => {
        setPark('Search for a national park');
        setState('Or select a state...')
    }

    const navigate = useNavigate();

    const goToPage = (name) => {
        const page = name.replace(/\s+/g, '-').toLowerCase();
        navigate(`/${page}`);
    }


    return (
        <>  
            <div className='home-overlay'></div>
            <div className='home-container'>
                <div className='home-filter-container'>
                    <span>National Parks</span>
                    <p>Explore America’s national parks. Discover our most treasured places, supported by people like you, and start your travel planning here by finding your park.</p>
                    <div className='search-for-national-park' onClick={toggleDropdown}>
                        <div className='search-placeholder'>
                            <span>{park}</span>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                    </div>
                    <div className='search-dropdown-container'>
                        {isDropdownOpen && <SearchDropdown props={allData.flat().map(data => data.fullName)} onClickHandler={onClickHandler}/>}
                    </div>
                    <div className='select-state' onClick={toggleState}>
                        <div className='search-placeholder'>
                            <span>{state}</span>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                    </div>
                    <div className='state-dropdown-container'>
                        {isStateOpen && <SearchDropdown props={states.map(state => state.name)} onClickHandler={onClickHandler}/>}
                    </div>
                    <p id='clear-filter' onClick={clearFilter}>Clear Filter</p>
                </div>
            </div>
            <div className='home-results-container'>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className='home-results-grid'>
                    {parkData.map(data => (
                        <div className='home-card-container' onClick={() => goToPage(data.fullName)}>
                            <Card key={data.url} image={data.images[0].url} name={data.fullName} description={data.description}/>
                        </div>
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