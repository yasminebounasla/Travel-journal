import prisma from "../utils/db.js";
import { cardCreationValidation } from "../utils/cardValidator.js";

export const getAllCards = async (req, res) => {
    try {
        /*----------------pagination-----------------------*/
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 3, 1);
        const skip = (page - 1) * limit;
        
        /*---------search filter----------------*/
        const search = req.query.search || "";
        const where = search
        ? {
            OR: [
                { title : { contains : search, mode : "insensitive" }},
                { country : { contains: search, mode : "insensitive" }},
                { text :  {contains: search, mode : "insensitive" }}
            ]
        } : {};
        
        /*-------------sorting----------------*/
        let orderBy;
        switch(req.query.sort){
            case "oldest" :
                orderBy = {createdAt: "asc"};
                break;
            case "title_asc" :
                orderBy = {title : "asc"};
                break;
            case "title_desc":
                orderBy = {title : "desc"};
                break;
            case "newest" :
            default :
                orderBy = {createdAt : "desc"};
                break;
        }
       
        const [cards, total] = await prisma.$transaction([
            prisma.entry.findMany({where, orderBy, skip, take: limit}),
            prisma.entry.count({ where }), 
        ])
        
        if (cards.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Travels found",
                data: []
            });
        }
        
        res.status(200).json({
            success: true,
            data: cards,
            pagination : {
                total,
                currentPage: page,        
                limit,
                totalPages: Math.ceil(total / limit), 
                hasNext: page < Math.ceil(total / limit), 
                hasPrev: page > 1,     
            }
        });
    } catch (err) {
        console.error("Error fetching Travels:", err);
        res.status(500).json({ error: "Failed to fetch cards" });
    }
};

// CREATE
export const createCard = async (req, res) => {
    const { title, country, googleMapsLink, dates, text, imgSrc, imgAlt } = req.body;

    try {
        
        const validatedData = cardCreationValidation.parse(req.body);
        const newCard = await prisma.entry.create({
            data: validatedData
        });

        res.status(201).json({
            success: true,
            message: "Travel card created successfully",
            data: newCard
        });

    } catch (err) {
        if (err.name === 'ZodError' && err.errors) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.errors.map(error => ({
                    field: error.path.join('.'),
                    message: error.message
                }))
            });
        }

    
        if (err.code) {
            return res.status(400).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        res.status(500).json({ 
            success: false,
            error: "Failed to create the card",
            message: err.message
        });
    }
};

// GET ONE
export const getOneCard = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const card = await prisma.entry.findUnique({
            where: { id }
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Travel not found"
            });
        }

        res.status(200).json({
            success: true,
            data: card
        });

    } catch (err) {
        console.error("Error fetching Travel:", err);
        res.status(500).json({ error: "Failed to fetch card" });
    }
};

// UPDATE
export const updateCard = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, country, googleMapsLink, dates, text, imgSrc, imgAlt } = req.body;

    try {
        const validatedData = cardCreationValidation.parse(req.body);
        const updated = await prisma.entry.update({
            where: { id },
            data : validatedData
        });

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {
        if (err.name === 'ZodError' && err.errors) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.errors.map(error => ({
                    field: error.path.join('.'),
                    message: error.message
                }))
            });
        }

        if (err.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Travel not found"
            });
        }

        res.status(500).json({ 
            success: false,
            error: "Failed to update the Travel",
            message: err.message
        });
    }
};

// DELETE
export const deleteCard = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const card = await prisma.entry.findUnique({
            where: { id }
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Travel not found"
            });
        }

        await prisma.entry.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "Travel deleted successfully"
        });

    } catch (err) {
        console.error("Error deleting the Travel:", err);
        res.status(500).json({ error: "Failed to delete the Travel" });
    }
};