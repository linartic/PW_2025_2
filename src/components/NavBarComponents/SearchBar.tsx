import { useState } from "react"
import { Link } from "react-router-dom"
import "./SearchBar.css"
const SearchBar = () => {
    const [search, setSearch] = useState<string>("")
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }
    const OnClick = () => {
        setSearch("")
    }
    return(
        <div className="SearchBar">
            <input className = "SearchInput rounded w-full" type="text" placeholder="Buscar" value={search} onChange={onSearchChange}/>
            <Link to={`/search/${search}`}>
                <button className="page-button btn" onClick={OnClick}>
                    <i className="bi bi-search"></i>
                </button>
            </Link>
        </div>
    )
}
export default SearchBar;