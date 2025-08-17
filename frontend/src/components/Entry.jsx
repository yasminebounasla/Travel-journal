
export default function Entry(props) {
    return (
        <article className="journal-entry">
            <div className="main-image-container">
                <img className="main-image" src={props.img.src} alt={props.img.alt}/>
            </div>
            <div className="infos-container">
                <img className="marker" src="/marker.png" alt="marker-icon" />
                <span>{props.country}</span>
                <a href={props.googleMapsLink}>View on google maps</a>

                <h2>{props.title}</h2>
                <h3>Dates: {props.dates}</h3>
                <p>
                    Text: {props.text}
                </p>
            </div>


        </article>
        
    )
}