import type { Nivel } from '../css/types'

interface FilaNivelProps {
  nivel: Nivel;
  onActualizar: (id: number, campo: keyof Nivel, valor: string | number) => void
}

export const FilaNivel = function({nivel, onActualizar} : FilaNivelProps){
  return (
    <tr>
      <td>{nivel.id}</td>
      <td>
        <input
          type="text"
          className="form-control"
          value={nivel.nombre}
          onChange={e => onActualizar(nivel.id, 'nombre', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          value={nivel.puntosRequeridos}
          onChange={e => onActualizar(nivel.id, 'puntosRequeridos', Number(e.target.value))}
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          value={nivel.recompensa}
          onChange={e => onActualizar(nivel.id, 'recompensa', e.target.value)}
        />
      </td>
    </tr>
  )
}
