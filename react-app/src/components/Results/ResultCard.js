import React from "react";
import { Link } from "react-router-dom";

import styles from "./Results.module.css";

function ResultCard({ user }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.profile_picture_buffer}>
      <div
        alt="user_profile_pic"
        style={{ backgroundImage: `url(${user.profile_url})` }}
        className={styles.profile_picture}
      />
      </div>
      <div className={styles.user_info}>
        <Link to={`/users/${user.id}`} className={styles.user_name}>
          {user.username}
        </Link>
        <p className={styles.user_bio}>{user.bio}</p>
      </div>
    </div>
  );
}

export default ResultCard;

