import './nav.styles.scss';
import Leaf from '../../Utils/Icons/leaf.svg';

const Nav = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <img src={Leaf} alt='leaf-logo'/>
                <span>Park<span id='planner'>Planner</span></span>
            </div>
        </div>
    )
}

export default Nav;