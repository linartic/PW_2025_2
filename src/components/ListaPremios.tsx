interface Premio {
    item: string;
    costo: number;
}

interface ListaPremiosProps {
    items: Premio[];
}

function ListaPremios(props: ListaPremiosProps) {
    return (
            <ul className="list-group mt-3 w-75">
            {props.items.map((item, index) => (
                <li key={index} className="list-group-item text-center">{item.item}  ({item.costo} monedas) </li>
            ))}
        </ul>
    );
}

export default ListaPremios;