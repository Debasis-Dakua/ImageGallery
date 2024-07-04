import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?count=10&client_id=PZGPQbAmCXQgjVSEx9T-vrhbzPIpxiOPZFJPzotcJe4`
      );
      const fetchedImages = response.data.map(image => ({
        id: image.id,
        small: image.urls.small,
        regular: image.urls.regular,
      }));
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image.regular);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery">
      <button onClick={fetchImages} className="refresh-button">Refresh</button>
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <img
              key={image.id}
              src={image.small}
              alt={`Gallery image ${image.id}`}
              className="gallery-image"
              onClick={() => handleImageClick(image)}
            />
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>

      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={handleCloseModal}>&times;</span>
          <img src={selectedImage} alt="Selected" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
