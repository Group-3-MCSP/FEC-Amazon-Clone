import ProductReview from './ProductReview';
import './ProductReview.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ReviewsComponent(props) {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="reveiwSection">
      <div className="left-section">
        <div className="section-title">Review this product</div>
        <div className="subtitle">Share your thoughts with other customers</div>
        <Link to="/newReview" className="button">
          Write a cusomer review
        </Link>
      </div>
      <div className="right-section">
        <div className="section-title">Top Reviews from the United States</div>

        {props.reviews.slice(0, showAll ? 100 : 5).map((item, index) => (
          <ProductReview key={index} {...item} />
        ))}
        <div className="show-button" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? 'Show less' : 'Show more'}
        </div>
      </div>
    </div>
  );
}
export default ReviewsComponent;
