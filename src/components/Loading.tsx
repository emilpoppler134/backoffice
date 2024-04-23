import React from "react";
import { Breadcrumb } from "../types/Breadcrumb";
import Layout from "./Layout";

const Loading: React.FC = () => {
  const breadcrumb: Breadcrumb = [{ title: "Loading..." }];

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="theme-spinner"></div>
    </Layout>
  );
};

export default Loading;
