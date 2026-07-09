import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getTokenData";
import User from "@/models/user";
import next from "next";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password ")
        return NextResponse.json({
            message:"user found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:400})
        
    }
}