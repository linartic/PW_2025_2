//Import de librerías
import { Link } from 'react-router-dom';
//Import de components

//Import de types
import type { Game } from "../../GlobalObjects/Objects_DataTypes"
import type { GameTag } from "../../GlobalObjects/Objects_DataTypes"

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

//Props
interface GameCardProps {
    game: Game
}
const GameCard = (props: GameCardProps) => {
    return (
        <div className="card h-100 border-0">
            <div>
                <Link to={`/game/${props.game.name}`}>
                    <img src={props.game.photo} className="card-img-top clickable" />
                </Link>
            </div>
            <div className="card-body">
                <h6 className="card-title fw-bold">{props.game.name}</h6>
                {
                    props.game.tags.map((tag: GameTag) => {
                        return (
                            <Link to={`/exploretags/${tag.name}`} key={tag.id}>
                                <span className="badge tag m-1">{tag.name}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default GameCard