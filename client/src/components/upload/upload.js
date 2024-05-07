"use client";
import React from "react";
import { Icons } from "../icons/icons";
import { createClient } from "@/lib/supabase/client";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { useMutation } from "@tanstack/react-query";
import * as Dialog from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "../loader";
import { v4 as uuidv4 } from "uuid";

export default function UserFileUpload({ userId, token }) {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const folderName = userId;
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_NAME;

  const supabase = createClient();
  const uppy = React.useRef(
    new Uppy({
      allowMultipleUploadBatches: false,
      restrictions: {
        allowedFileTypes: [".pdf"],
        maxNumberOfFiles: 5,
      },
    }).use(Tus, {
      endpoint: process.env.NEXT_PUBLIC_SUPABASE_RESUMABLE_UPLOAD_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/chat/create", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
  });


  const saveToDB = React.useCallback(async () => {
    try {
      const filesData = files.map((file) => {
        return {
          name: file.meta.name,
          document_url: file.meta.objectName,
          c_type: "DOCUMENT",
        };
      });
      const { data, error } = await supabase.from("chatbots").insert(filesData).select();
      if (error) throw error;

      console.log({data})

      data.forEach(element => {
        mutate(
          { document_url: element.document_url },
          {
            onSuccess: () => {
              // toast.success("Chat created!");
              // router.push(`/chat/${chat_id}`);
              console.log("Sucessful pushing to pinecone");
            },
            onError: (err) => {
              // toast.error("Error creating chat");
              console.error("Error uploading to pinecone", err);
            },
          }
        );
        
      });
      
 
      setFiles([])
    } catch (error) {
      console.log({ error });
    }
  }, [files, supabase, mutate]);

  React.useEffect(() => {
    if (files.length > 0) {
      saveToDB();
    }
  }, [files, saveToDB]);


  uppy.current.on("file-added", (file) => {
    const [filename, fileExt] = file.name.split(".");
    const filePath = `${uuidv4()}.${fileExt}`;

    file.meta = {
      ...file.meta,
      name: filename,
      extension: fileExt,
      bucketName: bucketName,
      objectName: folderName ? `${folderName}/${filePath}` : filePath,
      contentType: file.type,
    };
  });

  uppy.current.on("error", (error) => {
    console.error("Error", error);
  });

  uppy.current.on("upload", (data) => {
    setUploading(true);
    console.log("Upload started with data:", data);
  });

  uppy.current.on("upload-error", (file, error) => {
    console.error("Error uploading file:", file?.name, error);
  });

  uppy.current.once("complete", async (result) => {
    setFiles(result.successful);
    setUploading(false);
    console.log(
      "Upload complete! We’ve uploaded these files:",
      result.successful
    );
  });

  return (
    <>
      <Dialog.Dialog>
        <Dialog.DialogTrigger asChild>
          <Button variant="outline">Import</Button>
        </Dialog.DialogTrigger>
        <Dialog.DialogContent className="w-full max-w-max">
          <div className="flex w-full">
            <Dashboard uppy={uppy.current} />
            {uploading && (
              <div className="inset-0 absolute text-white flex items-center justify-center rounded-md z-50 bg-black/50">
                <Loader />
              </div>
            )}
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}
