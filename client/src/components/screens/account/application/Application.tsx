import React, { useEffect } from "react";
import { loadApplication } from "./application.slice";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import styles from "./application.module.css";
import ApplicationCard from "./ApplicationCard";

function Application(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadApplication());
  }, [dispatch]);

  const applications = useSelector(
    (state: RootState) => state.application.applicationList
  );

  return (
    <div className={styles.applicationBlock}>
      {applications.map((app) => {
        return <ApplicationCard key={app.id} app={app} />;
      })}
    </div>
  );
}

export default Application;
