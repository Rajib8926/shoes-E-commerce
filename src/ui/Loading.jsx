import styles from "./Loading.module.css";
function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:"black"
      }}
    >
      <div className={styles.loader}></div>{" "}
    </div>
  );
}

export default Loading;
