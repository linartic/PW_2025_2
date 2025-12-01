//Import de librerías
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//Import de componentss
import GameCard from "./GameCard";

//Import de types
import type { Game } from "../../GlobalObjects/Objects_DataTypes";
import type { GameTag } from "../../GlobalObjects/Objects_DataTypes";

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

//Props
interface ExploreGamesProps {
	games: Game[]
}

const ExploreGames = (props: ExploreGamesProps) => {
	const { name } = useParams<{ name: string }>();
	const filteredgames = props.games.filter((game: Game) => {
		return game.tags.some((tag: GameTag) => {
			return tag.name === name
		})
	})
	return (
		<div className="container my-5">
			<h1 className="mb-4">Explorar: <Link to={`/exploretags/`}><span className="badge tag m-1">{name}</span></Link></h1>
			<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
				{
					filteredgames.map((game: Game) => (
						<div className="col" key={game.id}>
							<GameCard game={game}></GameCard>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default ExploreGames;