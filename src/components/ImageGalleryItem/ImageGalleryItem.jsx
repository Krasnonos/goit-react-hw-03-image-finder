import { ImageGalleryCard, ImageGalleryImage } from './ImageGalerryItem.styled';

export const ImageGalleryItem = ({ card, showModal, id }) => {
  return (
    <ImageGalleryCard
      onClick={() => {
        showModal(id);
      }}
    >
      <ImageGalleryImage src={card.webformatURL} alt={card.tags} />
    </ImageGalleryCard>
  );
};
