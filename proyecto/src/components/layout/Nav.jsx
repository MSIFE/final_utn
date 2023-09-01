import { Link } from 'react-router-dom';

import '../../style/components/layout/Layout.css';

const Nav = (props) => {
    return(
        <>
   <nav>
    <div className="container">

                <a > <Link to='/'> Inicio</Link></a>
                <a ><Link to='/nosotros'>Quienes Somos </Link></a>
                <a ><Link to='/productos'>Nuestros Programas </Link></a>
                <a ><Link to='/login'>Login</Link></a>
    </div>
            </nav>
        </>
    )
}

export default Nav;