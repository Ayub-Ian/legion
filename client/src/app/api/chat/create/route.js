import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pineconePrepareDoc } from "@/lib/pinecone-prepare-docs";

export async function POST(req,res) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: "Unauthorized"}, { status: 401})

    try{
    const body = await req.json();
    const { document_url } = body
    const fileUrl = `${process.env.SUPABASE_STORAGE_URL}/${document_url}`
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    await pineconePrepareDoc(blob)
  
    return NextResponse.json(
      {
        message: "Successfull"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}