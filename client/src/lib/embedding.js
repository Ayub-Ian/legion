export async function getEmbeddings(query)
{
    try {
        const res = await fetch("/api/ollama", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query: query})
        })

        return res.json()
    } catch (error) {
        console.error("Error embedding with Ollama:", error)
    }
}