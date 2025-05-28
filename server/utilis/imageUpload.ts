import coludnary from "./cloudinary";

const UploadImageOnCloudnary =async (File:Express.Multer.File)=>{
    const base64Image = Buffer.from(File.buffer).toString("base64");
    const dataURI = `data:${File.mimetype};base64,${base64Image}`; 
    const uploadResponse=await coludnary.uploader.upload(dataURI);
    return uploadResponse.secure_url;
}

export default UploadImageOnCloudnary;

