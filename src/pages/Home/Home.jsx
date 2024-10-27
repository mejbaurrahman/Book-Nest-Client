import { Helmet } from "react-helmet";
import Banner from "../../components/Banner/Banner";
import CategorySection from "../../components/CategorySection/CategorySection";
import Faq from "../../components/Faq/Faq";
import ImageSection from "../../components/ImageSection/ImageSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Book Nest | Home</title>
      </Helmet>
      <Banner />
      <CategorySection />
      <ImageSection />
      <Faq />
    </>
  );
}
