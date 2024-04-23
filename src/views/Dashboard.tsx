import Layout from "../components/Layout";
import { Breadcrumb } from "../types/Breadcrumb";

export default function Dashboard() {
  const breadcrumb: Breadcrumb = [{ title: "Overview" }];

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-2xl"></div>
    </Layout>
  );
}
