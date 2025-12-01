import BrandLogo from './BrandLogo';
import CoinsButton from './CoinsButton';
import UserIcon from './UserIcon';
import LoginButtons from './LoginButtons';
import ThreeDotsIcon from './ThreeDotsIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import type { Pack } from '../../GlobalObjects/Objects_DataTypes';
import type { User } from '../../GlobalObjects/Objects_DataTypes';
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

interface NavBarProps {
	packs: Pack[]
	doLogOut: () => void
	user: User | null
	onMenuClick?: () => void
}

const NavBar = (props: NavBarProps) => {

	return (
		<div className="NavBar p-3 d-flex align-items-center justify-content-between">
			{/* Mobile Menu Button */}
			<div className="d-md-none me-2">
				<button className="btn btn-link text-white p-0" onClick={props.onMenuClick}>
					<i className="bi bi-list fs-1"></i>
				</button>
			</div>

			<div className="col-4 col-md-4 Right-NavBar d-flex align-items-center">
				<BrandLogo />
				<Link to="/exploretags" className='mx-3 NavBar-Header d-none d-md-block'>Explorar</Link>
				<div className="d-none d-md-block">
					<ThreeDotsIcon />
				</div>
			</div>

			<div className="col-4 col-md-4 Middle-NavBar d-none d-md-block">
				<SearchBar />
			</div>

			<div className="col-auto col-md-4 Left-NavBar ms-auto">
				<div className="d-flex align-items-center justify-content-end gap-2">
					{props.user ? (
						<>
							<div className="d-none d-md-block">
								<CoinsButton packs={props.packs} />
							</div>
							<h5 className="fw-bold m-0 pt-2 stars_coins d-none d-md-block">{props.user.coins}</h5>
							<UserIcon user={props.user} doLogOut={props.doLogOut} />
						</>
					)
						:
						(
							<>
								<LoginButtons />
							</>
						)}
				</div>
			</div>
		</div>

	);
};
export default NavBar;