import { useEffect, useState } from "react";

const useTransaction = (userInfo, page) => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/transaction/${userInfo?.accountNumber}?page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setTransaction(data));
  }, [page, userInfo?.accountNumber]);

  return { transaction, setTransaction };
};
export default useTransaction;
