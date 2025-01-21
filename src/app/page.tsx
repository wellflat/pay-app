'use client';

import { useEffect, useState } from "react";
import { Statement } from "./api/statement/route";
import StatementTable from "./components/StatementTable";
import MonthSelect from "./components/MonthSelect";

const page = () => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [month, setMonth] = useState<string>("10");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const getStatements = async () => {
    const res = await fetch(`/api/statement/${month}`);
    const statements = await res.json() as Statement[];
    setStatements(statements);
  };

  const changeMonth = (month: string) => {
    setMonth(month);
  };

  const getTotalAmount = () => {
    const total = statements.reduce((acc, s) => acc + s.amount, 0);
    setTotalAmount(total);
  }

  useEffect(() => {
    getStatements();
  }, [month]);

  useEffect(() => {
    getTotalAmount();
  }, [statements]);

  return (
    <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getStatements}>
        check history
      </button>
      <MonthSelect handleChange={changeMonth} />
      <p>合計金額: ￥{totalAmount}</p>
      <StatementTable statements={statements} />
    </>
  );
}
export default page;