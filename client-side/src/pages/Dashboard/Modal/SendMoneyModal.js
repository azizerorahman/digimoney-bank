import React from 'react';

const SendMoneyModal = () => {
    return (
        <div>
           

<input type="checkbox" id="my-modal-6" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure to transfer money ?</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <button  className="btn btn-sm bg-green-800 hover:bg-green-900 border-none text-white">Confirm</button>
      <label for="my-modal-6" className="btn bg-red-600 text-white hover:bg-red-900 btn-sm">Close</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default SendMoneyModal;