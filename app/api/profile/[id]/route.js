import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect } from "mongoose";
//Get
export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.find({}).populate('creator').where('creator').equals(params.id);
        if (!prompt) return new Response("prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}