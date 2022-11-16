import React, {useEffect} from "react"



export default function CloudinaryUploadWidget () {

    useEffect(() => {
        const cloudName = "compudevsphotos"
        const uploadPreset = "eew9gcfx"

        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset
            },

        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                document
                    .getElementById("uploadedimage")
                    .setAttribute("src", result.info.secure_url);
            }
        }
        );
        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
        
      }, [])

      return (
        <button id="upload_widget" className="cloudinary-button">
            Upload
        </button>
      ) 

}
