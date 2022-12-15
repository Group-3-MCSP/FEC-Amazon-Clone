import { useState } from 'react';
import Navbar from './Navbar.jsx';



import Preview from './Preview.jsx';
import styles from './App.module.css';
import RecsSection from './recs.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.centralCollumn}>
          <Preview />
          <Recssection />
        </div>
      </div>

    </div>
  );
}

export default App;
