import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import TodoDetail from "../components/TodoDetail";

const DetailPage = () => {
  return (
    <Layout>
      <Header />
      <TodoDetail />
      <Footer />
    </Layout>
  );
};

export default DetailPage;
