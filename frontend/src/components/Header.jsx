export default function Header() {
    return (
        <>
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
                            type="text"
                            placeholder="Search travels..."
                            className="search-input"
                        />
                       
                        <button
                            className="clear-search"
                            title="Clear search"
                        >
                            ×
                        </button>
                    </div>                    
                </div>
                <div className='header-right'>
                    <button className="add-btn">
                        <span className="plus-icon">+</span>
                        New
                   </button>
                </div>
            </header>
        </>
    );
}