"use client";
import React from "react";
import { Icons } from "../icons/icons";
import { createClient } from "@/lib/supabase/client";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';



export default function UserFileUpload() {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const bucketName = 'uppy'
  const folderName = 'notecraft'
  const projectId = "aobikkvpxwlayyrgkavf"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYmlra3ZweHdsYXl5cmdrYXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MDE3NDEsImV4cCI6MjAyOTI3Nzc0MX0.0hbABoIsmBJFs56iWCrlyxcRUWNq2BWX7S5BVxW2Ze4"
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`

  const supabase = createClient();
  const [uppy] = React.useState(() => new Uppy().use(Tus, {
    endpoint: supabaseUploadURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
  }));

  
  
  uppy.on('file-added', (file) => {
    const [_, fileExt] = file.name.split(".");
    const filePath = `test-notecraft-${Math.random()}.${fileExt}`;

    file.meta = {
      ...file.meta,
      bucketName: bucketName,
      objectName: folderName ? `${folderName}/${filePath}` : filePath,
      contentType: file.type,
    }
  })

  uppy.on("error", (error) => {
    console.error("Error", error);
  });

  uppy.on("upload", (data) => {
    console.log("Upload started with data:", data);
  });

  uppy.on("upload-error", (file, error) => {
    console.error("Error uploading file:", file?.name, error);
  });

  uppy.on("upload-success", async (file) => {
    console.log("Uploaded file:", file)
    try {
      const { error } = await supabase.from("chatbots").insert({
                      name: file.name,
                      document_url: file.meta.objectName,
                      c_type: "DOCUMENT"
                      })
                  if (error) throw error
    } catch (error) {
      console.log({error})
      
    }
  })

  uppy.on('complete', (result) => {

    console.log('Upload complete! We’ve uploaded these files:', result.successful)
  })

  
  return (
    <div className="max-h-[9.5rem] overflow-scroll">
    <Dashboard uppy={uppy} />
      {/* <label
        htmlFor="file-upload"
        className="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint"
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          // onChange={handleUpload}
        />
        <Icons.cloudUpload />
        <div>
          <span className="block text-md font-semibold mb-0.5">Import</span>
          <span className="block text-sm text-textGray">
            Add files into your library
          </span>
        </div>
        { uploading && <Icons.spinner className="animate-spin transition-all"/>}
      </label> */}
    </div>
  );
}