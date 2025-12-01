import { Link } from "react-router-dom";

const ExploreButton = () => {
return (
	<Link to="/PackMonedas"  className='mx-3 NavBar-Header'>
		<button className="carousel-button d-flex justify-content-center align-items-center border-0">
			Explorar
		</button>
	</Link>
);
};

export default ExploreButton;
