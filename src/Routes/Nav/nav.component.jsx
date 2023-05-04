import './nav.styles.scss';
import Leaf from '../../Utils/Icons/leaf.svg';
import { Outlet, Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
        <div className='nav-container'>
            <Link to='/' style={{textDecoration: 'none', color: '#323232'}}>
                <div className='logo-container'>
                    <img src={Leaf} alt='leaf-logo'/>
                    <span>Park<span id='planner'>Planner</span></span>
                </div>
            </Link>
        </div>
        <Outlet />
        </>
    )
}

export default Nav;