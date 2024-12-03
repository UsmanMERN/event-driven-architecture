import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

// Function to generate signed URL
export const generateSignedURL = async (publicId: string, userId: string) => {
    try {
        // Generate a timestamp for the signature
        const timestamp = Math.round(new Date().getTime() / 1000) - 59 * 60;

        // Parameters for signing
        const paramsToSign = {
            public_id: publicId,
            folder: `user_uploads/${userId}`,
            timestamp,
        };

        // Generate the signature
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET!
        );

        // Construct signed data for uploading
        const signedData = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
            api_key: process.env.CLOUDINARY_API_KEY!,
            timestamp,
            signature,
            public_id: publicId,
            folder: `user_uploads/${userId}`,
            upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
        };

        return signedData;
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw new Error("Unable to generate signed URL");
    }
};
