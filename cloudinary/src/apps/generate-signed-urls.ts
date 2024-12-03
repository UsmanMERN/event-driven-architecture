import { Hono } from "hono";
import { generateSignedURL } from "../lib/cloudinary.js";

const app = new Hono();

app.get('/generate-signed-url', async (c) => {
    try {
        // const publicId = c.req.query("public_id") || "default_id";
        // const userId = c.req.query("user_id") || "anonymous_user";
        const signedData = await generateSignedURL("publicId", " userId");

        return c.json({ signedData }, 200);
    } catch (error) {
        console.error("Error in /generate-signed-url:", error);
        return c.json({ message: "Something went wrong" }, 500);
    }
});

export default app;
