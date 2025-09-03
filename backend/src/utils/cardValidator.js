import {z} from  "zod";

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 50;
const MIN_TEXT_LENGTH = 10;
const MAX_TEXT_LENGTH = 500;
const MIN_COUNTRY_LENGTH = 3;
const MAX_COUNTRY_LENGTH = 50;
const MIN_IMGALT_LENGTH = 3;
const MAX_IMGALT_LENGTH = 30;

export const cardCreationValidation = z.object({
    title : z
    .string()
    .trim()
    .min(
        MIN_TITLE_LENGTH,
        `Title must be at least ${MIN_TITLE_LENGTH} characters long`
    )
    .max(
        MAX_TITLE_LENGTH,
        `Title must be at most ${MAX_TITLE_LENGTH} characters long`
    ),

    text : z
    .string()
    .trim()
    .min(
        MIN_TEXT_LENGTH, 
        `Content must be at least ${MIN_TEXT_LENGTH} characters long`
    )
    .max(
        MAX_TEXT_LENGTH,
        `Content must be at most ${MAX_TEXT_LENGTH} characters long`
    ),

    country : z
    .string()
    .trim()
    .min(
        MIN_COUNTRY_LENGTH,
        `Country must be at least ${MIN_COUNTRY_LENGTH} characters long`
    )
    .max(
        MAX_COUNTRY_LENGTH,
        `Country must be at most ${MAX_COUNTRY_LENGTH} characters long`
    ),

    googleMapsLink : z
    .string()
    .url("Must be a valid URL")
    .trim(),

    dates : z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format"),

    imgSrc : z
    .string()
    .trim(),

    imgAlt : z
    .string()
    .trim()
    .min(
        MIN_IMGALT_LENGTH,
        `Img ALt must be at least ${MIN_IMGALT_LENGTH} characters long`
    )
    .max(
        MAX_IMGALT_LENGTH,
        `Img ALt must be at most ${MAX_IMGALT_LENGTH} characters long`
    )
    .optional(),

    

})