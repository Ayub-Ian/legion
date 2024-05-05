import { OpenAIEmbeddings } from "@langchain/openai";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PineconeStore } from "@langchain/pinecone";
import { v4 as uuidv4 } from "uuid";
import { getEmbeddings } from "./embedding";

export async function embedAndStoreDocs(client, docs) {
  /*create and store the embeddings in the vectorStore*/
  try {
    
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME);
    const embedding = new OllamaEmbeddings({
      model: "llama3",
      baseUrl: "http://localhost:11434"
    });

    // vectorise and embed individual documents
    const vectors = await Promise.all(
      docs.flat().map(async (doc) => {
        try {
          const embeddings = await embedding.embedQuery(doc.pageContent);
          // const embeddings = await getEmbeddings(doc.pageContent)
          const hash = uuidv4();

          return {
            id: hash,
            values: embeddings,
            metadata: {
              pageNumber: doc.metadata.loc.pageNumber,
            },
          };
        } catch (error) {
          console.log("error embedding document", error);
          throw error;
        }
      })
    );

   console.log({vectors})

    //embed the PDF documents
    await pineconeIndex.upsert(vectors)
  
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(client) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}

async function embedDocument(doc) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

async function prepareDocument(page) {}
