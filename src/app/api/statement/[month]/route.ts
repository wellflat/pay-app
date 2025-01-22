import { NextRequest, NextResponse } from "next/server";
import { Statement, getHeader } from "../route";

export const GET = async (req: NextRequest,
    { params }: { params: Promise<{ month: number }>}) => {
    try {
        const { month } = await params;
        const url = `http://localhost:8000/statement/card/2/month/${month}`;
        const headers = getHeader();
        const res = await fetch(url, { headers: headers });
        const statements = await res.json() as Statement[];
        return NextResponse.json(statements);
    } catch (error) {
        console.error(error);
    }
}

export const dynamic = 'force-dynamic';