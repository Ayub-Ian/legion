import { Pinecone } from '@pinecone-database/pinecone'

import { delay } from "./utils";

let pineconeClientInstance = null;

// Create pineconeIndex if it doesn't exist
async function createIndex(client, indexName) {
  try {
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: 1536,
        metric: "cosine",
      },
    });
    console.log(
      `Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(process.env.INDEX_INIT_TIMEOUT);
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
  try {
    const pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
 
    const indexName = process.env.PINECONE_INDEX_NAME;

    const indexList = await pineconeClient.listIndexes();
    const existingIndexes = (indexList, name) => {
      for (let i = 0; i < indexList.indexes.length; i++) {
        if (indexList.indexes[i].name === name) {
            return true;
        }
    }
    return false;
    }

    if (!existingIndexes(indexList, indexName)) {
      createIndex(pineconeClient, indexName);
    } else {
      console.log("Your index already exists. nice !!");
    }

    return pineconeClient;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}


