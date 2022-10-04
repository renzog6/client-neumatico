import React from "react";
import Header from "./Header";
import styles from "../../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>      
      <footer className={styles.footer}>Powered by @renzog6</footer>
    </>
  );
}
