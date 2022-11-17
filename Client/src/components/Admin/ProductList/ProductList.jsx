import * as React from "react";
import {useState} from "react";
import { useController } from 'react-hook-form';
// import {uploadImage} from "../../../utils/utils"
import { useInput } from 'react-admin';
import { 
        List,
        Datagrid,
        TextField,
        ReferenceField,
        EditButton,
        Edit,
        SimpleForm,
        ReferenceInput,
        TextInput,
        Create,
        useRecordContext,
        UrlField,
        BooleanField,
        BooleanInput,
        NumberInput,
        ImageInput,
        required,
        minLength,
        maxLength,
        minValue,
        maxValue,
        number,
        regex,
        email,
        choices,
        Box

        } from 'react-admin';


    const CloudyInput = ({ source, label }) => {

    const { id, field, fieldState } = useInput({ source });
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        e.preventDefault()
        const files = e.target.files;
        console.log("files", files)
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
        setImage(file.secure_url)
        console.log("cloudinary", file.secure_url)
        field.value = file.secure_url  
        console.log("field", field)     
    }
     
    return (
        <>
        <label htmlFor={id}>
            {label}
            <input
                id={id} 
                type="url"
                {...field}                
            />
            {fieldState.error && <span>{fieldState.error.message}</span>}
        </label> 
        <input
                type="file" 
                onChange={e => uploadImage(e)}  
            />
        <p> {image} </p>
            {/* {image && <span>{image}</span>} */}        
        </>
    );
};


const PictureInput = ({ source, label }) => {
    const { id, field, fieldState } = useInput({ source });
    // field.value = "otro archivo"
    console.log("field", field)
    return (
        <label htmlFor={id}>
            {label}
            <input 
            id={id} 
            {...field} />
            {fieldState.error && <span>{fieldState.error.message}</span>}
        </label>
    );
};


const PictureInputA = ({source, label}) => {
    const input1 = useController({name: source, defaultValue: ''})
    const input2 = useController({name: "cloudinary", defaultValue: ''})

    const { id, field, fieldState } = useInput({ source });
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);


    const uploadImage = async (e) => {
        e.preventDefault()
        const files = e.target.files;
        console.log("files", files)
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
        setImage(file.secure_url)
        console.log("cloudinary", file.secure_url)
        field.value = file.secure_url  
        console.log("field", field)     
    }

    return (
        <label>
            <input
            {...input1.field}  
            type="file"
            onChange={e => uploadImage(e)}          
            
            />
        </label>
    )
}


const productFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="category" label="Category" reference="category" />,
    <ReferenceInput source="name" label="Name" reference="name"/>
]

const validateSku = [required(), minLength(10), maxLength(25)]
const validateName = [required(), minLength(5), maxLength(50)]
const validatePrice = [required()]
const validateWeight = []
const validateDescription = [required(), minLength(20), maxLength(200)]
const validateImage = []
const validateBrand = []
const validateStock = [required("The min stock is 1"), minValue(0)]
const validateCategory = [required()]

export const ProductList = () => (
    <List perPage={5}
          sort={{field: 'name', order: 'desc'}}
          filters={productFilters}
          >
        <Datagrid 
                sx={{
                '& .column-id': {letterSpacing:1, maxWidth: 100, textOverflow: 'ellipsis | ', overflow: 'hidden'},
                '& .column-image': { maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden'},
                '& .column-description': { maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden', }
            }}
            >
            <TextField source="id" />
            {/* <TextField source="id" /> */}
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="price" />
            <TextField source="lastPrice" />
            <TextField source="weight" />
            <TextField source="description"/>
            <UrlField source="image"/>
            <BooleanField source="status" />
            <TextField source="brand" />
            <TextField source="benchmark" />
            <ReferenceField source="category" reference="category" link="show"/>
            {/* <TextField source="category" /> */}
            <TextField source="stock" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ProductEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="sku" validate={validateSku}/>
            <TextInput source="name" validate={validateName}/>
            <NumberInput source="price" validate={validatePrice}/>
            <NumberInput source="lastPrice" />
            <NumberInput source="weight" />
            <TextInput source="description" />
            <TextInput source="image" />
            {/* <CloudinaryUploadWidget /> */}
            <BooleanInput source="status" />
            <TextInput source="brand" />
            <NumberInput source="benchmark" />
            <ReferenceInput source="category" reference="category" validate={validateCategory}/>
            {/* <TextInput source="category" /> */}
            <NumberInput source="stock" validate={validateStock}/>
            {/* <ReferenceInput source="userId" reference="users" /> */}
            {/* <TextInput source="id" /> */}
            {/* <TextInput disabled source="title" /> */}
            {/* <TextInput source="title" /> */}
            {/* <TextInput source="body" /> */}
            {/* <TextInput source="body" /> */}
        </SimpleForm>
    </Edit>
);

export const ProductCreate= (props) => (

    <Create {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="sku" validate={validateSku}/>
            <TextInput source="name" validate={validateName}/>
            <NumberInput source="price" validate={validatePrice}/>
            <NumberInput source="lastPrice" />
            <NumberInput source="weight" />
            <TextInput source="description" />
            {/* <PictureInputA source="image" label="image"/>
            <PictureInput source="image" label="image"/> */}
            <CloudyInput source="image"/>
            {/* <ImageInput source="image" /> */}
            <BooleanInput source="status" />
            <TextInput source="brand" />
            <NumberInput source="benchmark" />
            <ReferenceInput source="category" reference="category" validate={validateCategory} defaultValue={0}/>
            {/* <TextInput source="category" /> */}
            <NumberInput source="stock" validate={validateStock}/>

            {/* <ReferenceInput source="userId" reference="users" /> */}
            {/* <TextInput source="id" /> */}
            {/* <TextInput disabled source="title" /> */}
            {/* <TextInput source="title" /> */}
            {/* <TextInput source="body" /> */}
            {/* <TextInput source="body" /> */}
        </SimpleForm>
    </Create>
);