/* eslint-disable no-unused-vars */
import bannerPhoto from "../../assets/images/banner2.png";
import bannerPhoto2 from "../../assets/images/p-1 (8).jpg";
import SpecialButton from "../SpecialButton/SpecialButton";
export default function Banner() {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={bannerPhoto} className="lg:w-1/2 md:w-1/2 w-4/5 rounded-lg" />
        <div className="lg:p-2 md:p-2 p-5">
          <h1 className="text-5xl font-bold">Unlock a World of Stories</h1>
          <p className="py-6">
            Find Your Next Favorite Book at{" "}
            <span className="text-3xl  font-extralight">Book Nest</span>
          </p>
          <SpecialButton name="Buy Book"></SpecialButton>
        </div>
      </div>
    </div>
  );
}
