'use client';

import React from "react";
import { JSX } from "react";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { Statement } from "./api/statement/route";
import { DateRange } from "./api/statement/daterange/route";
import Header from "./components/Header";
import StatementTable from "./components/StatementTable";
import MonthSelect from "./components/MonthSelect";
import Progress from "./components/Progress";


const Home = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
  const [statements, setStatements] = useState<Statement[]>([]);
  const [month, setMonth] = useState<string>("10");
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const renderFlagRef = useRef(false);  // 初回判定用
  const { data: session } = useSession();

  const getDateRange = async () => {
    const res = await fetch(`/api/statement/daterange?card=2`);
    if (!res.ok) {
      throw new Error(`Failed to fetch date range: ${res.statusText}`);
    } else {
      const dateRange = await res.json() as { start: string, end: string };
      setDateRange(dateRange);
    }
  };
  useEffect(() => {
    getDateRange();
  }, []);
  
  const getStatements = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const res = await fetch(`/api/statement?card=2&month=${month}`);
      console.log(res);
      if (!res.ok) {
        setError('支払履歴がありません');
        setStatements([]);
        setLoading(false);
      } else {
        const statements = await res.json() as Statement[];
        setStatements(statements);
        setSuccess(true);
        setLoading(false);
      }
    }
  };

  const changeMonth = (month: string) => {
    setMonth(month);
  };

  const getTotalAmount = () => {
    const amount = statements.reduce((acc, s) => acc + s.amount, 0);
    const currency = amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
    setTotalAmount(currency);
  };

  useEffect(() => {
    if (renderFlagRef.current) {
      getStatements();
    } else {
      renderFlagRef.current = true;
    }
  }, [month]);

  useEffect(() => {
    if (statements.length !== 0) {
      setError('');
    }
    getTotalAmount();
  }, [statements]);

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      '&:hover': {
        bgcolor: blue[700],
      },
    }),
  };

  if (!session) {
    return (
      <>
        <Header is_auth={false}/>
      </>
    )
  }

  return (
    <>
      <Header is_auth={true}/>
      <Box>
        <Button variant="contained" sx={buttonSx} disabled={loading} onClick={getStatements}>
          支払履歴を確認
        </Button>      
        <Box component="div" sx={{ display: 'inline', marginLeft: 2 }}>
          { session ? session.user?.email : 'Not signed in' }&nbsp;&nbsp;
          {error}
        </Box>      
        <Progress loading={loading} />
      </Box>
      <MonthSelect handleChange={changeMonth} dateRange={dateRange} loading={loading} />
      <Box sx={{ marginTop: 1 }}><strong>合計金額: {totalAmount}</strong></Box>
      <StatementTable statements={statements} />
    </>
  );
}
export default Home;
