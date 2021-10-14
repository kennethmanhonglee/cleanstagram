import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProfileHeader.module.css";
import { getUser } from "../../store/users";

function ProfileHeader() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;
  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_header_display}>
        <div className={styles.username_and_buttons}>
          <div className={styles.username}>
            <h1>{user.username}</h1>
          </div>
          {currentUser && currentUser.id !== +userId && (
            // click the button and call function to call thunk to follow
            <button>Follow</button>
          )}
        </div>
        <div className={styles.profile_stats}>
          <div className={styles.following_stats}>
            <h2>
              <span>{user.followers.length}</span> followers
            </h2>
          </div>
          <div className={styles.following_stats}>
            <h2>
              <span>{user.following.length}</span> followers
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;