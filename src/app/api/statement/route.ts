import { NextRequest, NextResponse } from "next/server";

export interface Statement {
    id: number;
    card_id: number;
    store: string;
    amount: number;
    payment_date: string;
    payment_month: number;
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const card = searchParams.get('card');
        const month = searchParams.get('month');
        if (!card || !month) {
            throw new Error('card and month are required');
        }
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}/statement/card/${card}/month/${month}`;
        const headers = getHeader();        
        const res = await fetch(url, { headers: headers });
        console.log(res);
        if (!res.ok) {
            throw new Error('支払履歴がありません');
        }
        const statements = await res.json() as Statement[];
        return NextResponse.json(statements);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getHeader = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error('API_KEY is not set');
    }
    const headers = {'X-API-KEY': apiKey};
    return headers;
};
export const dynamic = 'force-dynamic';