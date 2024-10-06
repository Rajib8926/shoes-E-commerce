import styles from "./Star.module.css";
function Star() {
  return (
    <div
      className={styles.Stars}
      style={{"--rating": 2.3}}
      aria-label="Rating of this product is 2.3 out of 5."
    ></div>
  );
}

export default Star;
