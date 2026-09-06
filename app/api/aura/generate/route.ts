import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { hospital_name, country, type } = await req.json();

  const vercelRes = await fetch("https://api.vercel.com/v10/projects", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: `${hospital_name.toLowerCase().replace(/ /g, '-')}-aura`,
      framework: "nextjs"
    })
  });

  const vercelData = await vercelRes.json();
  const siteUrl = `https://${vercelData.name}.vercel.app`;

  return NextResponse.json({ 
    success: true, 
    url: siteUrl 
  });
      }
