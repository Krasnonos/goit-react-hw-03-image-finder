import React, { PureComponent } from 'react';
import { getInfoFromApi } from '../../utils/Api';
import { Wrap } from './App.styled';
import { SeacrhBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ButtonShowMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export class App extends PureComponent {
  state = {
    queryString: '',
    page: 1,
    images: null,
    status: 'idle',
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { queryString, page } = this.state;

    if (prevState.queryString !== queryString || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const response = await getInfoFromApi(queryString, page);
        this.setState({ images: response, status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
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
    const { images, status } = this.state;

    return (
      <Wrap>
        <SeacrhBar submitForm={this.submitForm} />;
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'resolved' && images.length === 12 && (
          <ButtonShowMore showMore={this.showMore} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>Please try again</h1>}
      </Wrap>
    );
  }
}
