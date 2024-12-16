import { Schema, SchemaType } from "@google/generative-ai";

// Would be really nice to have the schema depend on the contract dto somehow
export const diseaseImageSchema: Schema = {
    description: "List of verdicts image verdicts for each presumed disease",
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            advice: {
                type: SchemaType.STRING,
                description:
                    "Advice to consult a qualified professional should be here and only here.",
                nullable: false
            },
            disease: {
                type: SchemaType.STRING,
                description: "Disease (disease category) given in the request.",
                nullable: false
            },
            verdict: {
                type: SchemaType.STRING,
                description:
                    `Image verdict with the key points that helped with making a decision.` +
                    `Please do not include any advice or warnings here, as there is a special field for that.`,
                nullable: false
            },
            probability: {
                type: SchemaType.NUMBER,
                description:
                    "Probability that the assumption about the present disease was correct, ranges from 0 to 1.",
                nullable: false
            }
        },
        required: ["disease", "verdict", "probability", "advice"]
    }
};
