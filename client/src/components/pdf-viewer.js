"use client"
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React from 'react'
import packageJson from '../../package.json'


function removeCaratFromString(str) {
    if (str.includes("^")) {
        return str.replace("^", "");
    }
    return str;
}


const pdfjsVersion = removeCaratFromString(packageJson.dependencies['pdfjs-dist'])




export default function PDFViewer({ fileUrl }) {
    const workerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();


    return (
        <>
            <Worker workerUrl={workerUrl}>
                <Viewer
                plugins={[defaultLayoutPluginInstance]}
                    fileUrl={fileUrl}
                />
            </Worker>
        </>
    )
}
