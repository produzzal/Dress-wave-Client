"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="flex justify-center items-center">
      <div>
        {/* Main Image */}
        <img
          src={selectedImage}
          alt={productName}
          width={400}
          height={400}
          className="rounded"
        />

        {/* Thumbnails */}
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className={`rounded object-cover w-16 h-16 cursor-pointer border ${
                selectedImage === image
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
