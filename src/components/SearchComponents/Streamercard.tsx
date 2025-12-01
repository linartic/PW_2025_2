//Import de librerías
import { Link } from 'react-router-dom';

//Import de components

//Import de types
import type { User } from '../../GlobalObjects/Objects_DataTypes';

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"
import '../HomeComponents/Streamcard.css';

// Props
interface UserCardProps {
  	user : User
}

const StreamerCard = (props: UserCardProps) => {
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
			<div className="card border-0">
                <Link to={`/profile/${props.user.name}`}>
                    <div className="card-body" id = "StreamerBox">
					<div className="ImgBox">
                        <img className="StreamerImg" src={props.user.pfp} alt="Img"/>
                    </div>
					<div className="d-flex justify-content-center pe-3"id = "NickNameOverflow">
						<h6 className="card-title fw-bold">{props.user.name}</h6>
					</div>
				</div>
                </Link>
			</div>
		</div>
	);
};

export default StreamerCard;