import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.css";

const Success = () => {
  const history = useHistory();

  const goToRegister = () => {
    history.replace("/");
  };

  return (
    <div className={styles.card}>
      <Result
        status="success"
        title="Successfully Logged In"
        subTitle="Use button bellow to logout"
        extra={[
          <Button type="primary" key="logout" onClick={goToRegister}>
            Logout
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
