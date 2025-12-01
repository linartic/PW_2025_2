//Import de librerías
import { Link } from 'react-router-dom';

//Import de components

//Import de types
import type { Stream } from '../../GlobalObjects/Objects_DataTypes';

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"
import './Streamcard.css';

// Props
interface StreamCardProps {
  	stream : Stream
}

const StreamCard = (props: StreamCardProps) => {
  	const DivisiónAproximada = (dividendo : number, divisor : number, decimas : number) => {
        const cociente = dividendo/divisor;
        return(cociente.toFixed(decimas))
    }
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
			<div className="card border-0">
				<div className="card-image">
					<Link to={`/streaming/${props.stream.user.name}`}>
						<img src={props.stream.thumbnail} className="card-img-top stream-card-thumbnail clickable"/>
					<div className="overlay">
						<span className="badge bg-danger">{props.stream.viewersnumber >= 1000000? DivisiónAproximada(props.stream.viewersnumber,1000000,1) + " M ": props.stream.viewersnumber >= 1000? DivisiónAproximada(props.stream.viewersnumber,1000,1) + " K ":props.stream.viewersnumber}viewers</span>
					</div>
					</Link>
				</div>
				<div className="card-body" id = "StreamerBox">
					<div className="ImgBox">
                        <img className="StreamerImg" src={props.stream.user.pfp} alt="Img"/>
                    </div>
					<div id = "NickNameOverflow">
						<h6 className="card-title fw-bold">{props.stream.title}</h6>
						<p className="card-text text-muted">{props.stream.user.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StreamCard;