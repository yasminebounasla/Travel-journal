import { useState, useRef } from "react";

export default function Header({ onCreateClick, onSearchResults, onClearSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
       
        if (!value.trim()) {
            onSearchResults([]);
            return;
        }

        try {
            const res = await fetch(`/api/cards?search=${encodeURIComponent(value.trim())}&limit=10`);
           
            if (!res.ok) {
                console.error("Search request failed:", res.status, res.statusText);
                const errorText = await res.text();
                console.error("Error response:", errorText);
                onSearchResults([]);
                return;
            }

            const contentType = res.headers.get("content-type");
           
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                console.log("Search results:", data);
                
                // Extract the data array from the response structure
                const results = data.data || [];
                onSearchResults(results);
            } else {
                console.error("Search response is not JSON, content-type:", contentType);
                const responseText = await res.text();
                console.error("Actual response:", responseText);
                onSearchResults([]);
            }
        } catch (err) {
            console.error("Search error:", err);
            onSearchResults([]);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        
        // Clear search results immediately
        if (onClearSearch) {
            onClearSearch();
        } else {
            onSearchResults([]);
        }
        
        // Remove focus to prevent width animation conflicts
        if (inputRef.current) {
            inputRef.current.blur();
        }
        
    };

    return (
        <header>
            <div className='header-left'>
                <div className="header-logo">
                    <img src="/globe.png" alt="globe-icon" />
                </div>
                <div className="header-text">
                    <h1>my travel journal</h1>
                </div>
            </div>

            <div className="header-center">
                <div className="search-container">
                    <svg
                        className="search-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                   
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search travels..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                   
                    {searchTerm && (
                        <button
                            className="clear-search"
                            type="button"
                            title="Clear search"
                            onClick={handleClearSearch}
                            onMouseDown={(e) => e.preventDefault()} 
                        >
                            ×
                        </button>
                    )}
                </div>                    
            </div>

            <div className='header-right'>
                <button
                   className="add-btn"
                   type="button"
                   onClick={onCreateClick}
                >
                    <span className="plus-icon">+</span>
                    New
               </button>
            </div>
        </header>
    );
}