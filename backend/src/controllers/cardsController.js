import prisma from "../utils/db.js";

// CREATE
export const createCard = async (req, res) => {
    const { title, country, googleMapsLink, dates, text, imgSrc, imgAt } = req.body;

    try {
        const newCard = await prisma.entry.create({
            data: {
                title,
                country,
                googleMapsLink,
                dates,
                text,
                imgSrc,
                imgAt
            }
        });

        res.status(201).json({
            success: true,
            message: "Travel card created successfully",
            data: newCard
        });

    } catch (err) {
        console.error("Error creating Travel card:", err);
        res.status(500).json({ error: "Failed to create the card" });
    }
};

// GET ALL
export const getCards = async (req, res) => {
    try {
        const cards = await prisma.entry.findMany();

        if (cards.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Travels found"
            });
        }

        res.status(200).json({
            success: true,
            data: cards
        });

    } catch (err) {
        console.error("Error fetching Travels:", err);
        res.status(500).json({ error: "Failed to fetch cards" });
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
    const { title, country, googleMapsLink, dates, text, imgSrc, imgAt } = req.body;

    try {
        const updated = await prisma.entry.update({
            where: { id },
            data: {
                title,
                country,
                googleMapsLink,
                dates,
                text,
                imgSrc,
                imgAt
            }
        });

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {
        console.error("Error updating the Travel:", err);
        res.status(500).json({ error: "Failed to update the Travel" });
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
