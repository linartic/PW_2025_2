//Import de librerías

//Import de components
import StreamCard from "./Streamcard"

//Import de types
import type { Stream } from "../../GlobalObjects/Objects_DataTypes"

//Import de css
import "../../GlobalObjects/Animations.css"
import "../../GlobalObjects/Global.css"

//Props
interface FeedProps {
  streams: Stream[];
}

const Feed = (props: FeedProps) => {
  return (
    <div className="container my-4">
      <h2 className="mb-3 fw-bold">Streams Recomendados</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {props.streams.map((stream: Stream, index: number) => (
          <div className="col" key={`stream-${stream.id}-${index}`}>
            <StreamCard stream={stream} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;