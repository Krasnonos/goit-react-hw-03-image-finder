import React, { PureComponent } from 'react';
import { getInfoFromApi } from '../../utils/Api';
import { Wrap } from './App.styled';
import { SeacrhBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ButtonShowMore } from '../Button/Button';

export class App extends PureComponent {
  state = {
    queryString: '',
    page: 1,
    images: null,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { queryString, page } = this.state;

    if (prevState.queryString !== queryString || prevState.page !== page) {
      const response = await getInfoFromApi(queryString, page);
      this.setState({ images: response });
    }
  }

  submitForm = (value, { resetForm }) => {
    this.setState({ page: 1, queryString: value.queryString });
    resetForm();
  };

  showMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images } = this.state;

    return (
      <Wrap>
        <SeacrhBar submitForm={this.submitForm} />;
        {images && <ImageGallery images={images} />}
        {images && <ButtonShowMore showMore={this.showMore} />}
      </Wrap>
    );
  }
}
