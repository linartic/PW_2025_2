//Import de librerías
import { Link } from 'react-router-dom';

//Import de components

//Import de types
import type { GameTag } from "../../GlobalObjects/Objects_DataTypes"

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

//Props
interface CategoryCardProps{
    tag : GameTag
}

const CategoryCard = (props: CategoryCardProps) => {
    return(
        <div className="col-4 mb-3">
			<Link to={`/exploretags/${props.tag.name}`}>
				<div className="card">
					<div className="card-body clickable">
						<h5 className="card-title">{props.tag.name}</h5>
						<p className="card-text">Ver todos los streams de {props.tag.name}</p>
					</div>
				</div>
			</Link>
        </div>
    )
}
export default CategoryCard