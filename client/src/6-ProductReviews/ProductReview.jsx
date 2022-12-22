import { useState } from 'react';

const ProductReview = (props) => {
  const [count, setCount] = useState(0);

  function genHelpful() {
    if (count < 1) {
      return null;
    } else if (count === 1) {
      return <div className="helpful-line">One person found this helpful</div>;
    } else if (count > 1) {
      return <div className="helpful-line">{count} people found this helpful</div>;
    }
  }

  function genStarOffset() {
    let base = -22;
    if (props.rating === 5) {
      return base + 20;
    } else if (props.rating === 4) {
      return base;
    } else {
      return base - (4 - props.rating) * 40;
    }
  }

  function genDate(rawDate) {
    let date = new Date(rawDate);
    let output = date.toLocaleDateString();
    return output;
  }

  return (
    <div className="product-review">
      <div className="userline">
        <div className="profile-icon"></div>
        <div className="username">{props.username}</div>
      </div>
      <div className="title-line">
        <div className="star-image" style={{ backgroundPosition: `-2px ${genStarOffset()}px` }}></div>
        <div className="review-title">{props.title}</div>
      </div>
      <div className="review-date">Reviewed in the United States on {genDate(props.datecreated)}</div>
      {props.verifiedreview && <div className="verified">Verified Purchase</div>}
      <div className="review-body">{props.body}</div>
      {genHelpful()}
      <div className="buttons-row">
        <div className="helpful-button" onClick={() => setCount((prev) => prev + 1)}>
          Helpful
        </div>
        | <div className="report">Report abuse</div>
      </div>
    </div>
  );
};

export default ProductReview;
