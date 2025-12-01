//Import de librerías
import { useParams } from "react-router-dom";

//Import de componentss
import StreamCard from "../HomeComponents/Streamcard";
import StreamerCard from "./Streamercard"
import GameCard from "../ExploreComponents/GameCard";

//Import de types
import type { Stream } from "../../GlobalObjects/Objects_DataTypes";
import type { User } from "../../GlobalObjects/Objects_DataTypes";
import type { Game } from "../../GlobalObjects/Objects_DataTypes";

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

//Props
interface SearchProps {
	streams: Stream[]
	users: User[]
	games: Game[]
}

const Search = (props: SearchProps) => {
	const { name } = useParams<{ name: string }>();
	const searchedstream = props.streams.filter((stream: Stream) => {
		return stream.game.name.toUpperCase() === name?.toUpperCase() ||
			stream.user.name.toUpperCase() === name?.toUpperCase();
	})
	const searcheduser = props.users.filter((user: User) => {
		return user.name.toUpperCase() === name?.toUpperCase()
	})
	const searchedgame = props.games.filter((game: Game) => {
		return game.name.toUpperCase() === name?.toUpperCase()
	})
	return (
		<div className="container my-5 px-4">
			<h1 className="mb-4">Streams:</h1>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
				{
					searchedstream.map((stream: Stream) => (
						<div className="col" key={stream.id}>
							<StreamCard stream={stream}></StreamCard>
						</div>
					))
				}
			</div>
			<h1 className="mb-4">Usuarios:</h1>
			<div className="row">
				{
					searcheduser.map((user: User) => (
						<StreamerCard user={user}></StreamerCard>
					))
				}
			</div>
			<h1 className="mb-4">Juegos:</h1>
			<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
				{
					searchedgame.map((game: Game) => (
						<div className="col" key={game.id}>
							<GameCard game={game}></GameCard>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default Search;