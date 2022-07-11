import { BtnLoadMore } from './Button.styled';

export const ButtonShowMore = ({ showMore }) => {
  return (
    <BtnLoadMore type="button" onClick={showMore}>
      Load more
    </BtnLoadMore>
  );
};
