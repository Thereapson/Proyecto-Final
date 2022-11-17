const FormData = require('form-data');

async function uploadImage(image) {
    const files = image.rawFile;
    const data = new FormData();
    data.append("file", files)
    data.append("upload_preset", "eew9gcfx")
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/compudevsphotos/image/upload",
        {
            method: "POST",
            body: data,
        }
    )
    const file = await res.json()
    //console.log(res)
    return (file.secure_url)
}

export default uploadImage();