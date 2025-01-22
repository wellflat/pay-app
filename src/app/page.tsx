'use client';

import { useEffect, useState, useRef } from "react";
import { Statement } from "./api/statement/route";
import StatementTable from "./components/StatementTable";
import MonthSelect from "./components/MonthSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";


const page = () => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [month, setMonth] = useState<string>("10");
  const [totalAmount, setTotalAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const renderFlagRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getStatements = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const res = await fetch(`/api/statement?card=2&month=${month}`);
      const statements = await res.json() as Statement[];
      setStatements(statements);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }
  };

  const changeMonth = (month: string) => {
    setMonth(month);
  };

  const getTotalAmount = () => {
    const amount = statements.reduce((acc, s) => acc + s.amount, 0);
    const currency = amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
    setTotalAmount(currency);
  }

  useEffect(() => {
    if (renderFlagRef.current) {
      getStatements();
    } else {
      renderFlagRef.current = true;
    }
  }, [month]);

  useEffect(() => {
    getTotalAmount();
  }, [statements]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      '&:hover': {
        bgcolor: blue[700],
      },
    }),
  };

  return (
    <>
      <Box>
        <Button variant="contained" sx={buttonSx} disabled={loading} onClick={getStatements}>
          支払履歴を確認
        </Button>
        {loading && (
          <CircularProgress
            size={25}
            sx={{
              color: blue[500],
              position: 'absolute',
              top: '0%',
              left: '0%',
              marginTop: '25px',
              marginLeft: '64px',
            }}
          />
        )}
      </Box>
      <MonthSelect handleChange={changeMonth} loading={loading} />
      <Box sx={{ marginTop: 1 }}><strong>合計金額: {totalAmount}</strong></Box>
      <StatementTable statements={statements} />
    </>
  );
}
export default page;