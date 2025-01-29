'use client';

import React from "react";
import { JSX } from "react";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { Statement } from "./api/statement/route";
import Header from "./components/Header";
import StatementTable from "./components/StatementTable";
import MonthSelect from "./components/MonthSelect";
import Progress from "./components/Progress";


const Home = (): JSX.Element => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [month, setMonth] = useState<string>("10");
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const renderFlagRef = useRef(false);
  const { data: session } = useSession();

  const getStatements = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const res = await fetch(`/api/statement?card=2&month=${month}`);
      if (!res.ok) {
        setError(res.statusText);
        setLoading(false);
        throw new Error(`Failed to fetch statement: ${res.statusText}`);
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
    //if (renderFlagRef.current) {
      getStatements();
    //} else {
    //  renderFlagRef.current = true;
    //}
  }, [month]);

  useEffect(() => {
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
          { session ? session.user?.email : 'Not signed in' }
          </Box>      
        <Progress loading={loading} />
      </Box>
      <p>{error}</p>
      <MonthSelect handleChange={changeMonth} loading={loading} />
      <Box sx={{ marginTop: 1 }}><strong>合計金額: {totalAmount}</strong></Box>
      <StatementTable statements={statements} />
    </>
  );
}
export default Home;
