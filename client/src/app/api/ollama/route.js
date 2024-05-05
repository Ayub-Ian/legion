import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        const embedding = new OllamaEmbeddings({
            model: "llama3",
            baseUrl: "http://localhost:11434"
          });
    
        
        
        const documentEmbeddings = await embedding.embedQuery(body.query);

        if (!documentEmbeddings) {
            return NextResponse.json("Error: no embeddings", {
              status: 400,
            });
          }
        return NextResponse.json(documentEmbeddings)
        
    } catch (error) {
        console.error("Internal server error ", error);
        return NextResponse.json("Error: Something went wrong. Try again!", {
          status: 500,
        });
    }
    

}