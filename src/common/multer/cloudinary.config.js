import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary tự động nhận diện biến môi trường CLOUDINARY_URL nên không cần gọi cloudinary.config()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dadn_images', // Thư mục lưu trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export const uploadCloud = multer({ storage });
