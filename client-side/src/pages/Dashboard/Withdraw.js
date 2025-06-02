// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

// const Withdraw = ({ u }) => {
//     const {_id, amount, displayName } = u
//     const { register, handleSubmit } = useForm();
//     const onSubmit = data => {
//         if (amount>data.withdrawAmount) {
//            const newAmount = amount-data.withdrawAmount;
//            const updatedAmount={amount:newAmount,withdrawAmount:data.withdrawAmount}
//            const url=`${process.env.REACT_APP_API_URL}/approvedUsers/${_id}`;
//           fetch(url,{
//                method:'PATCH',
//                 headers:{
//                     'content-type':'application/json'
//                 },
//                 body:JSON.stringify(updatedAmount)
//             })
//             .then(res=>res.json())
//             .then(result=>{
//                 toast.success("Withdraw successfull")
//             })
//         }
//         else{
//             console.log('You cannot withdraw');
//         }
//     };
//     return (
//         <div>
//             {/* balance card  */}
//             <div class="card balance-card  bg-[#6160DC] text-gray-200">
//                 <div class=" p-5">
//                     <p className="text-xl">
//                         <small>My Balance</small>
//                     </p>

//                     <h2 class="card-title text-3xl mb-5">{amount}</h2>
//                     <p className="text-end font-bold">6589 2157 6325 2564</p>

//                     <div class="card-actions gap-x-10 mt-5">
//                         <div>
//                             <p className="text-xs font-[500]">Card Holder</p>
//                             <h1 className="text-lg font-bold">{displayName}</h1>
//                         </div>
//                         <div>
//                             <p className="text-xs font-[500]">Valid Thru</p>
//                             <h1 className="text-lg font-bold">03/21</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* withdraw card */}
//             <div class="card card-side bg-base-100 shadow-xl mt-10">
//                 <div class="card-body">
//                     <h2 class="card-title">Withdraw</h2>

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <label class="label">
//                             <span class="label-text">Amount to withdraw</span>
//                         </label>
//                         <input type="number" placeholder="Provide Amount" class="input input-bordered w-full max-w-xs" {...register("withdrawAmount")} />
//                         <input class="btn btn-primary ml-4"  type="submit" />
//                     </form>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Withdraw;
