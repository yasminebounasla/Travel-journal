import { Edit, Trash2 } from "lucide-react";

export default function Entry(props) {
    return (
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    src={props.img?.src || props.imgSrc || "/globe.png"} 
                    alt={props.img?.alt || props.imgAlt || "Travel image"} 
                />

            </div>
            <div className="infos-container">
                <div style={{
                    display:"flex",
                    alignItems : "center",
                    justifyContent: "space-between"
                }}>
                    <div>
                        <img className="marker" src="/marker.png" alt="marker-icon" />
                        <span>{props.country}</span>
                        <a href={props.googleMapsLink}>View on google maps</a>
                    </div>
                    <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent : "space-between",
                        gap: "8px"
                    }}>
                        <button 
                            className="edit-btn"
                            onClick={() => props.onEdit(props.id)}
                            title="Edit entry"
                        >
                            <Edit size={16} />
                        </button>
                        <button 
                            className="delete-btn"
                            onClick={() => props.onDelete(props.id)}
                            title="Delete entry"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                <h2>{props.title}</h2>
                <h3>Dates: {props.dates}</h3>
                <p>
                    Text: {props.text}
                </p>
            </div>
        </article>
       
    )
}