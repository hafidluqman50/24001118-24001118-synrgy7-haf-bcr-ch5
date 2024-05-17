import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: "dfylrgzcu", 
  api_key: "959328352525834", 
  api_secret: "qoSSFOsA04zM8-J1hjENfz3Yq_w",
  secure: true
})

export {
  cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse
}