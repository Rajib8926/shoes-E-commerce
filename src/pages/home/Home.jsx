
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.section1}>
        <div className={styles.textSection}>
          <h1>Nike Pegasus EasyOn Electric</h1>
          <p>
            Responsive cushioning in the Pegasus provides an energised ride for
            everyday road running. Experience lighter-weight energy return with
            dual Air Zoom units and a ReactX foam midsole. Plus, improved
            engineered mesh on the upper decreases weight and increases
            breathability.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img
            src="NikePegasusEasyOnElectric.png"
            alt="NikePegasusEasyOnElectric"
            className={styles.section1Img}
          />
        </div>
      </section>
      <div className={styles.middleText}>
        <p>Nike Electric Pack</p>
        <h1>WIN ON AIR</h1>
        <button>Shop Now</button>
      </div>
      <section className={styles.section2}></section>
      <div className={styles.middleText}>
        <h1>AIR JORDAN COLLECTION</h1>
        <button>SEE MORE</button>
      </div>
      <section className={styles.section3}>
        <div className={styles.imageSection}>
          <img
            src="NikeV2KRun.png"
            alt="NikePegasusEasyOnElectric"
            className={styles.section3Img}
          />
        </div>
        <div className={styles.textSection}>
          <h1>Nike V2K Run</h1>
          <p>
            Fast forward. Rewind. Doesn't matter—this shoe takes retro into the
            future. The V2K remasters everything you love about the Vomero in a
            look pulled straight from an early '00s running catalogue.
          </p>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
