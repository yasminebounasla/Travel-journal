export const BASE_URL = "http://localhost:5000/api/cards";

const fetchData = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        const text = await res.text();
        let data;
        
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        if (!res.ok) {
            throw new Error(data?.message || data || "Request failed");
        }

        return data;
    } catch (err) {
        throw new Error(err.message || "Network error occurred");
    }
};


export const getAllCards = async (page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });
    
    return fetchData(`${BASE_URL}?${queryParams}`, { method: "GET" });
};

export const createCard = async (cardData) => {
    return fetchData(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(cardData)
    });
};

export const updateCard = async (id, cardData) => {
    return fetchData(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(cardData)
    });
};

export const getOneCard = async (id) => {
    return fetchData(`${BASE_URL}/${id}`, {
        method: "GET"
    });
};

export const deleteCard = async (id) => {
    return fetchData(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
};


export const searchCards = async (searchTerm, limit = 10) => {
    const queryParams = new URLSearchParams({
        search: searchTerm,
        limit: limit.toString()
    });
    
    return fetchData(`${BASE_URL}?${queryParams}`, { method: "GET" });
};