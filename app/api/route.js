import { NextResponse } from "next/server";
export async function GET (){
    const templates ={
        'header': 'HeaderOne',
        'hero': 'HeroSectionTwo',
        'footer':'FooterTwo'
    }

    return NextResponse.json(templates);
} 