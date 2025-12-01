import "../../GlobalObjects/Icons.css";
import "../HomeComponents/CarouselSlide.css"
import { Link } from "react-router-dom"
const ThreeDotsIcon = () => {
    return(
        <div className="dropdown">
        <button className=" icon carousel-button d-flex justify-content-center align-items-center border-0" id="userDropdown" data-bs-toggle="dropdown">
            <i className = "bi bi-three-dots-vertical"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
                <Link to="/Nosotros" className="dropdown-item">
                Nosotros
                </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
                <Link to="/TyC" className="dropdown-item">
                Términos y Condiciones
                </Link>
            </li>
        </ul>
        </div>
    )
}
export default ThreeDotsIcon