import React from 'react';

function Card({ _id, image, title, rating, logo, price, offerprice }) {
  let discount = price - offerprice;

  let offer = Math.floor((discount / price) * 100);

  return (
    <div className='col mb-5' key={_id}>
      <div className='card h-100 border-0'>
        {/* <!-- Product image--> */}
        <img
          className='card-img-top img-fluid image '
          src={image}
          alt='mobile'
        />
        {/* <!-- Product details--> */}
        <div className='card-body p-4'>
          <div className='text-center'>
            {/* <!-- Product name--> */}

            <h6 className='card-title'>{title}</h6>
            <img className='img-fluid logo' src={logo} alt='logo' />

            {rating > 4 ? (
              <div className='d-flex justify-content-center small text-warning mb-2'>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
              </div>
            ) : (
              <div className='d-flex justify-content-center small text-warning mb-2'>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
                <div className='bi-star-fill'></div>
              </div>
            )}
            {/* <!-- Product price--> */}

            <div>
              <span className='text-muted text-decoration-line-through'>
                {price}
              </span>{' '}
              <span>
                {offerprice}{' '}
                {offer ? (
                  <span style={{ color: 'red' }}>({offer}% OFF)</span>
                ) : (
                  <span style={{ color: 'red' }}>({10}% OFF)</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
