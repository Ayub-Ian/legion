"use client";
import React from "react";
import { Icons } from "../icons/icons";
import { createClient } from "@/lib/supabase/client";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { useMutation } from "@tanstack/react-query";




export default function UserFileUpload() {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const bucketName = 'uppy'
  const folderName = 'notecraft'
  const projectId = "aobikkvpxwlayyrgkavf"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYmlra3ZweHdsYXl5cmdrYXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MDE3NDEsImV4cCI6MjAyOTI3Nzc0MX0.0hbABoIsmBJFs56iWCrlyxcRUWNq2BWX7S5BVxW2Ze4"
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`

  const supabase = createClient();
  const [uppy] = React.useState(() => new Uppy({
    allowMultipleUploadBatches: false,
    restrictions: {
      allowedFileTypes: ['.pdf'],
      maxNumberOfFiles: 5
    }
  }).use(Tus, {
    endpoint: supabaseUploadURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
  }));

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      document_url
    }) => {
      const response = await fetch("/api/chat/create", {
        method: "POST",
        body: JSON.stringify({document_url: document_url})
        
      });
      return response.data;
    },
  });


  
  
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
    setUploading(true)
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
                  mutate({document_url: file.meta.objectName}, {
                    onSuccess: ({ chat_id }) => {
                      // toast.success("Chat created!");
                      // router.push(`/chat/${chat_id}`);
                      console.log("Sucessful pushing to pinecone")
                    },
                    onError: (err) => {
                      // toast.error("Error creating chat");
                      console.error("Error uploading to pinecone",err);
                    },
                  });
    } catch (error) {
      console.log({error})
      
    }
  })

  uppy.on('complete', (result) => {
    setUploading(false)
    console.log('Upload complete! We’ve uploaded these files:', result.successful)
  })

  
  return (
    <div className="max-h-[9.5rem] overflow-scroll">
    <Dashboard uppy={uppy} />
    {uploading && (
       <div className="inset-0 absolute text-white flex items-center justify-center z-50 bg-black/60">
       <div className="flex flex-col items-center gap-2">
       
       <div className="loader">
         <div className="rect1"></div>
         <div className="rect2"></div>
         <div className="rect3"></div>
         <div className="rect4"></div>
       </div>
       <p className="text-center font-medium">Spilling into notecraft..</p>
       </div>
     </div>
    )}
   
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
