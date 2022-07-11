import { ImageGalleryCard, ImageGalleryImage } from './ImageGalerryItem.styled';

export const ImageGalleryItem = ({ card }) => {
  return (
    <ImageGalleryCard>
      <ImageGalleryImage src={card.webformatURL} alt={card.tags} />
    </ImageGalleryCard>
  );
};
