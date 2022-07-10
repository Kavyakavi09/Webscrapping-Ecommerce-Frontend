import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Card from './components/Card';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Footer from './components/Footer';
import { ProductProvider } from './Context';
import ReactPaginate from 'react-paginate';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let size = 10;
  async function searchData() {
    try {
      let productData = await axios.get(
        `https://web-scrapping-ecommerce-app.herokuapp.com/api/product/mobiles?search=${search}&page=1&size=${size}`
      );

      setData(productData.data.data);
      setPageCount(Math.ceil(1200 / size));
      console.log(productData.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // to get the search data loading
  useEffect(() => {
    if (search.length === 0 || search.length > 2) searchData();
  }, [search, size]);

  // pagination

  const fetchComments = async (currentPage) => {
    try {
      let productData = await axios.get(
        `https://web-scrapping-ecommerce-app.herokuapp.com/api/product/mobiles?search=${search}&page=${currentPage}&size=${size}`
      );

      console.log(productData.data.data);
      return productData.data.data;
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    console.log(currentPage);
    const mobileProduct = await fetchComments(currentPage);
    setData(mobileProduct);
  };

  return (
    <div>
      <ProductProvider value={{ search, setSearch }}>
        <Navbar />
        <section className='pt-4 pb-5'>
          <div className='row pt-5'>
            <div className='col mx-auto'>
              <div className='container mt-5 px-4'>
                <div className='row gx-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center'>
                  {data.map((product) => {
                    return <Card key={product._id} {...product} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
        <Footer />
      </ProductProvider>
    </div>
  );
}

export default App;
