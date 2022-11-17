import React, {useState} from 'react'
import {Container, FormGroup, Input} from 'reactstrap'

const UploadingImage = (props) => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0])
        data.append("upload_preset", "eew9gcfx")
        setLoading(true)
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/compudevsphotos/image/upload",
            {
                method: "POST",
                body: data,
            }
        )
        const file = await res.json()
        //console.log(res)
        setImage(file.secure_url)
        console.log(file.secure_url)
        console.log(image)
        setLoading(false)
    }

    return (
        <div>
            <Container style={{textAlign: "center"}}>
                <h1>
                    Subiendo Imagenes
                </h1>
                <FormGroup>
                    <Input 
                    type="file"
                    name="file"
                    placeholder="Sube la imagen aqui"
                    onChange={uploadImage}
                    />                    
                </FormGroup>
            </Container>
        </div>
    )
}

export default UploadingImage;