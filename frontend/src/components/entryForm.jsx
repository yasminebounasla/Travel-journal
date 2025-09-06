import { useState } from "react";
import { X, Check } from "lucide-react";

export const EntryForm = ({
    mode,
    initialData = {title :"", text : "", country : "", googleMapsLink : "", dates :"" , imgSrc : "", imgAlt: ""},
    onSubmit,
    onCancel,
    loading = false
}) => {
    
    const [title, setTitle] = useState(initialData.title);
    const [text, setText] = useState(initialData.text);
    const [country, setCountry] = useState(initialData.country);
    const [googleMapsLink, setGoogleMapsLink] = useState(initialData.googleMapsLink);
    const [dates, setDates] = useState(initialData.dates);
    const [imgSrc, setImgSrc] = useState(initialData.imgSrc);
    const [imgAlt, setImgAlt] = useState(initialData.imgAlt);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit({title, text, country, googleMapsLink, dates, imgSrc, imgAlt});
    };

    return (
        <>
            <div
               className="form-bg"
               onClick={onCancel}
            >
                <div
                   className="form-container"
                   onClick={(e)=> e.stopPropagation()}
                >
                    {/*---Model Header---*/}
                    <div className="form-header">
                        <h2>
                            {mode === "edit" ? "Edit Travel"  : "New Travel"}
                        </h2>
                        <button
                           className="cancel-btn"
                           onClick={onCancel}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/*---Model Content---*/}
                    <div className="form-content">
                        <form 
                          onSubmit={handleSubmit}
                          className="form"
                        >
                            <div className="field-group">
                                <label className="field-label">Title</label>
                                <input  
                                    type="text" 
                                    value={title} 
                                    onChange={(e)=> setTitle(e.target.value)}
                                    className="field-input"
                                    placeholder="Enter Travel Title ..."
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Description</label>
                                <textarea 
                                    value={text}
                                    onChange={(e)=> setText(e.target.value)}
                                    className="field-textarea"
                                    placeholder="Write your travel description..."
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Country</label>
                                <input 
                                    type="text" 
                                    value={country}
                                    onChange={(e)=> setCountry(e.target.value)}
                                    className="field-input"
                                    placeholder="Enter the country..."
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Google Maps Link</label>
                                <input 
                                    type="url" 
                                    value={googleMapsLink}
                                    onChange={(e) => setGoogleMapsLink(e.target.value)} 
                                    className="field-input"
                                    placeholder="Enter the Link..."
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Dates</label>
                                <input 
                                    type="text" 
                                    value={dates}
                                    onChange={(e) => setDates(e.target.value)} 
                                    className="field-input"
                                    placeholder="e.g. March 2024..."
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Image URL</label>
                                <input 
                                    type="url"
                                    value={imgSrc}
                                    onChange={(e)=> setImgSrc(e.target.value)}
                                    className="field-input"
                                    placeholder="Enter image URL..."
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Image name</label>
                                <input 
                                    type="text" 
                                    value={imgAlt}
                                    onChange={(e)=> setImgAlt(e.target.value)}
                                    className="field-input"
                                    placeholder="Enter image name..."
                                />
                            </div>

                            <div className="form-buttons">
                                <button
                                   className="submit-btn"
                                   type="submit"
                                   disabled={loading} 
                                >
                                    {loading ? (
                                        <>
                                           <div className="spinner"></div>
                                           {mode==="edit" ? "Updating..." : "Saving..."}
                                        </>
                                    ) : (
                                        <>
                                           <Check size={16} />
                                           {mode === "edit" ? "Update" : "Create"} Travel
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}