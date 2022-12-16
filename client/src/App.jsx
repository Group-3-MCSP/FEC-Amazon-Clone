import { useState } from 'react';
import Navbar from './Navbar.jsx';
import AmazonQA from './q&a.jsx';
import Preview from './Preview.jsx';
import styles from './App.module.css';

import ReviewsComponent from './ProductReviews/Comp.jsx';
import CreateReview from './ProductReviews/CreateReview.jsx';
import RecsSection from './recs.jsx';

const review = {
  title: 'Great controller',
  body: "I knew before buying this that it would be a 'premium' controller when I'm more familiar with the generic options afforded by Mircosoft and Sony respectively. My concern was that it would be uncomfortable as i have smaller hands. I am pleased to report that not only is it comfortable, but it feels much more premium than I even expected. This controller is SOLID and the software control (I am using this as a game pad for PC) is pretty user friendly. The back toggles are surprisingly easy to reach and have a very satisfying 'click' when actuated. The rumble feature is what really proved the build quality to me. Being familiar with the standard options, I am used to a very high-pitched rattle when the rumble is activated, but the elite has a low grumble without feeling muffled which is a testament to either the better rumble devices OR the more solid build quality OR both. All in all I am pleased with this purchase and I'm thoroughly enjoying using it, just wish it didn't hurt my wallet as bad.",
  rating: 5,
  author: 'John Doe',
};
var newReview = { ...review };
function App() {
  const [count, setCount] = useState(0);
  const [appMode, setAppMode] = useState('ItemPage');

  const [currentUser, setCurrentUser] = useState('');
  const [submittedUser, setSubmittedUser] = useState(currentUser);

  const [currentRating, setRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState(currentRating);

  const [title, setTitle] = useState('');
  const [submittedTitle, setSubmittedTitle] = useState(title);

  const [currentReviewBody, setCurrentReviewBody] = useState('');
  const [submitedReview, setSubmitedReview] = useState(currentReviewBody);

  const [reviewArray, setReviewArray] = useState([review]);
  const handleClick = () => {
    setAppMode('ItemPage');

    setSubmittedUser(currentUser);
    setSubmitedReview(currentReviewBody);
    setSubmittedRating(currentRating);
    setSubmittedTitle(title);

    newReview.title = title;
    newReview.rating = submittedRating;
    newReview.author = currentUser;
    newReview.body = currentReviewBody;

    setReviewArray((prev) => {
      return [...prev, newReview];
    });
    console.log(reviewArray);
  };
  let appProps = {
    count,
    setCount,
    appMode,
    setAppMode,
  };
  var props = {
    ...appProps,
    currentReviewBody, setCurrentReviewBody,
    submitedReview, setSubmitedReview,
    reviewArray, setReviewArray,
    currentUser, setCurrentUser,
    submittedUser, setSubmittedUser,
    currentRating,setRating,
    submittedRating,setSubmittedRating,
    title,setTitle,
    submittedTitle, setSubmittedTitle,
  };

  return (
    <div className={styles.App}>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.centralCollumn}>

          {appMode === 'NewReview' ? (
            <>
            <CreateReview {...props} />
            <button onClick={handleClick}>Submit</button>
            </>
          ) : (
            <>
              <Preview />
              <RecsSection />
              
          <AmazonQA />
          <button className="submitReview" onClick={()=> setAppMode('NewReview')}>
          New Review
        </button>
             {reviewArray.map((item)=>
                <ReviewsComponent key={item.id} {...props} {...item}/>)} 
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
export default App;
