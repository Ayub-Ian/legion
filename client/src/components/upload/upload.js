"use client";
import React from "react";
import { Icons } from "../icons/icons";
import { createClient } from "@/lib/supabase/client";

export default function UserFileUpload({ onUpload }) {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const supabase = createClient();

  const uploadFile = async (event) => {
    setUploading(true);
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select a file to upload.");
      }

      const file = event.target.files[0];
      const [name, fileExt] = file.name.split(".");
      const filePath = `test-notecraft-${Math.random()}.${fileExt}`;

      

      const { error: uploadError, data: { path } } = await supabase.storage
        .from("library")
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }

      if (path) {
        try {
            const { error } = await supabase.from("chatbots").insert({
                name,
                document_url: path,
                c_type: "DOCUMENT",
                updated_at: new Date().toISOString()
            })
            if (error) throw error
        } catch (error) {
            console.log({error})
        }
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint"
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={uploadFile}
        />
        <Icons.cloudUpload />
        <div>
          <span className="block text-md font-semibold mb-0.5">Import</span>
          <span className="block text-sm text-textGray">
            Add files into your library
          </span>
        </div>
        { uploading && <Icons.spinner className="animate-spin transition-all"/>}
      </label>
    </>
  );
}
