import './search-dropdown.styles.scss';
import { useState, useEffect } from 'react';

const SearchDropdown = ({props, onClickHandler}) => {
    const [ filteredProps, setFilteredProps ] = useState([]);

    useEffect(() => {
        setFilteredProps(props);
    }, [props])

    const onChangeHandler = (event) => {
        const newSearch = event.target.value;
        const newProps = props.filter(prop => (prop.toLowerCase()).includes(newSearch.toLowerCase()));
        setFilteredProps(newProps);
    }


    return (
        <>
            <div className='search-input-container'>
                <input type='text' onChange={onChangeHandler}/>
            </div>
            <div className='search-input-results-container'>
                <div className='search-container'>
                {filteredProps.map(prop => (
                    <button className='search-input-results' value={prop} onClick={onClickHandler}>
                        <span>{prop}</span>
                    </button>
                ))}
                </div>
            </div>
        </>
    )
}

export default SearchDropdown;