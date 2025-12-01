// components/NavBar/AuthButtons.tsx
// Botones de iniciar sesión y registrarse para usuarios no autenticados

import { Link } from 'react-router-dom';
import "../../GlobalObjects/Icons.css";
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

const LoginButtons = () => {
return (
	<div className="d-flex align-items-center gap-2 ">
		<Link to="/login">
			<button className= "btn btn-primary page-button border-0">
				Iniciar Sesión
			</button>
		</Link>
		<Link to="/signin">
			<button className= "btn btn-primary page-button border-0">
				Registrarse
			</button>
		</Link>
	</div>
);
};

export default LoginButtons;
