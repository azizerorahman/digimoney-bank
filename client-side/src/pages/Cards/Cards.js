import React from "react";
import creditcard from "../../../src/assets/images/creditcard.jpg";
import visacard from "../../../src/assets/images/visacard.png";
import visacardmastercard from "../../../src/assets/images/visamastercardclassic.jpg";
import applepay from "../../../src/assets/images/applepay.png";
import Menubar from "../../components/NavBar";

const Cards = () => {
  return (
    <div className="container mx-auto text-base-300">
      <div className="carousel w-full p-4 space-x-4">
        <div
          id="slide1"
          className="carousel-item relative w-full rounded-box shadow-xl"
        >
          <img src={creditcard} className="w-full" />
        </div>
      </div>
      {/* hero */}
      <div className="hero lg:min-h-screen">
        <div className="hero-content flex-col lg:flex-row gap-26">
          <img src={visacard} className="rounded-lg " />
          <div>
            <h1 className="text-5xl font-bold ">
              Visa and MasterCard Gold Cards!
            </h1>
            <p className="py-6">
              Account currency: USD, EUR Discounts and privileges from Visa and
              MasterCard payment systems Issue of additional bank cards Card
              issue within a payroll card programme.
            </p>
            <button className="btn btn-secondary text-base-300 ">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* hero2 */}
      <div className="hero pb-44 ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-26">
          <img
            src={visacardmastercard}
            className="lg:max-w-md w-sm rounded-lg "
          />
          <div>
            <h1 className="text-5xl font-bold">
              Visa Classic and MasterCard Standard Cards
            </h1>
            <p className="py-6">
              Account currency: USD, EUR Discounts and privileges from Visa and
              MasterCard payment systems Issue of additional bank cards Card
              issue within a payroll card programme
            </p>
            <button className="btn btn-secondary text-base-300 ">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* card  */}
      <div className="card card-side mb-36">
        <figure>
          <img src={applepay} className=" w-5/6" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Buy with Apple Pay</h2>
          <p>
            Download the DigiMonye Bank app and simplify your banking. Discover
            quick, simple and convenient way to take command of your bank
            account, on your mobile phone
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary text-base-300">
              Buy with apple pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
