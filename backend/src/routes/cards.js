import { getOneCard, getCards, createCard, deleteCard, updateCard } from "../controllers/cardsController.js";
import express from "express";

const routes = express.Router();

routes.get('/', getCards);        
routes.get('/:id', getOneCard);   
routes.post('/', createCard);     
routes.put('/:id', updateCard);  
routes.delete('/:id', deleteCard);

export default routes;
