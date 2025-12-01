 

type Props = {
  stream: {
    id: number;
    title: string;
    viewers: number;
    status: 'live' | 'idle' | 'offline';
  };
};

function PanelStream({ stream }: Props) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div className="fw-bold">{stream.title}</div>
        <small className="text-muted">{stream.viewers} espectadores</small>
      </div>
      <div>
        <span className={`badge ${stream.status === 'live' ? 'bg-danger' : 'bg-secondary'}`}>
          {stream.status}
        </span>
      </div>
    </div>
  );
};

export default PanelStream;
