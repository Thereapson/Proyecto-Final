export function range (start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1}, 
    (_, i) => start + (i * step))   
}

export const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0])
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