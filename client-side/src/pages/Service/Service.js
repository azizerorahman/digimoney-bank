import React, { useState } from "react";
import image1 from "../../assets/images/bank-img-1.jpg";
import sendmoney from "../../assets/images/service/sendmoney.jpg"
import cashin from "../../assets/images/service/cashin.jpg"
import billpay from "../../assets/images/service/billpay.jpg"
import recharge from "../../assets/images/service/recharge.jpg"
import gasbill from "../../assets/images/service/gasbill.jpg"
import payment from "../../assets/images/service/payment.png"
import "./service.css";

const Service = () => {
  const [showall, setShowAll] = useState(false);
  const serviceDAta = [
    {
      id: 1,
      title: "SEND MONEY",
      desc: "Send money from any where with our banking website. ",
      image: sendmoney,
    },
    {
      id:2,
      title: "CASH IN",
      desc: "You can deposite your money from any branch of us",
      image: cashin,
    },
    {
      id: 3,
      title: "BILL PAY",
      desc: "you can pay any kind of bill with our banking website",
      image: billpay,
    },
    {
      id: 4,
      title: "RECHARGE",
      desc: "You can recharge your mobile balance with help of our banking website",
      image: recharge,
    },
    {
      id: 5,
      title: "GAS BILL",
      desc: "You can pay gas bill, electricity bill and water bill with the help of our banking website",
      image: gasbill,
    },
    {
      id: 6,
      title: "PAYMENT",
      desc: "Pay any kind of bill like shopping and food bill with the bill of our banking website",
      image: payment,
    },
    {
      id: 7,
      title: "CALL US",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
      image: image1,
    },
 
  ];
  const services = !showall ? serviceDAta.slice(0, 6) : serviceDAta;
  return (
    <>
 
    <main className="mb-32">
      <h1 className="text-5xl text-center text-base-300 mt-20 mb-5 ">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="service-card bg-primary mx-auto text-white cursor-pointer">
            <div className="service-card-wraper ">
              <div className="  mx-auto   ">
                <figure className="px-10 pt-10">
                  <img  style={{height:"25vh"}}
                    src={service.image}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body  ">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.desc}</p>
                
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="service-container flex justify-center"></div>

      <button
        onClick={() => setShowAll(!showall)}
        className="btn btn-primary bg-white hover:bg-[#005C53] hover:text-white  text-[#005C53] border-[#005C53] mx-auto block mt-16"
        >
        Learn More
      </button>
    </main>
        </>
  );
};

export default Service;
