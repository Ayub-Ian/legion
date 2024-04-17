import axios from "axios"
import { useState } from "react"

function App() {

  const [files, setFiles] = useState([])
  const [text, setText] = useState(null)

  const upload = () => {

    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append('file', file)
    })

    axios.post("http://127.0.0.1:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    ).then(res => {
      console.log({ res })
      setText(res.data)
    }).catch(error => {
      console.error("error", error)
    })

  }


  return (
    <>
      <div className='main-wrapper'>
        <div className='sidebar'>
          <input type='file' multiple onChange={(e) => setFiles(e.target.files)} />

          {files.length > 0 && Array.from(files).map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
          <button onClick={upload}>Process</button>
        </div>

        <div className='chat'>
          <p>Chat with multiple pdfs</p>
          {text && <p>{text}</p>}
        </div>

      </div>
    </>
  )
}

export default App
