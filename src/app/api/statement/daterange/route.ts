import { NextRequest, NextResponse } from "next/server";

export interface DateRange {
    start: string;
    end: string;
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const card = searchParams.get('card');
        if (!card) {
            throw new Error('card is required');
        }
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}/statement/card/${card}/daterange`;
        const headers = getHeader();        
        const res = await fetch(url, { headers: headers });
        if (!res.ok) {
            throw new Error('支払履歴がありません');
        }
        const range = await res.json() as DateRange;
        return NextResponse.json(range);
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