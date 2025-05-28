import { useEffect } from "react";
import { useState } from "react";

const useFindTransaction = (userInfo) => {
  const [pageCount, setPageCount] = useState(0);
  const url = `http://localhost:4000/transactionCount/${userInfo?.accountNumber}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const pageCount = data.count;
        const pages = Math.ceil(pageCount / 10);
        setPageCount(pages);
      });
  }, [userInfo, url]);

  return { pageCount, setPageCount };
};

export default useFindTransaction;
