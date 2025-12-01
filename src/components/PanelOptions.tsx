import { useState } from 'react';
import './panel.css';

interface PanelControlProps {
    opciones: string[];
    onSeleccionar: (opcion: string) => void;
}

const PanelOptions = function(props: PanelControlProps)  {
  const [seleccionado, setSeleccionado] = useState(props.opciones[0]);

  const handleClick = (opcion: string) => {
    setSeleccionado(opcion);
    props.onSeleccionar(opcion);
  };

  return (
    <div className="col-2 vh-100 p-3 border-end panel-options-container">
      <h5 className="mb-4">Panel de Control</h5>
      <div className="list-group">
        {props.opciones.map((opcion) => (
          <button
            key={opcion}
            className={`list-group-item list-group-item-action ${seleccionado === opcion ? 'active' : ''}`}
            onClick={() => handleClick(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PanelOptions;
