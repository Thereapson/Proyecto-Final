import * as React from "react";
import {useState} from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget/CloudinaryUploadWidget";
import {uploadImage} from "../../../utils/utils"
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


const productFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="category" label="Category" reference="category" />,
    <ReferenceInput source="name" label="Name" reference="name"/>
]

const validateSku = [required(), minLength(10), maxLength(20)]
const validateName = [required(), minLength(5), maxLength(30)]
const validatePrice = [required()]
const validateWeight = []
const validateDescription = [required(), minLength(20), maxLength(200)]
const validateImage = []
const validateBrand = []
const validateStock = [required()]

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
            <NumberInput source="weight" />
            <TextInput source="description" />
            <TextInput source="image" />
            {/* <CloudinaryUploadWidget /> */}
            <BooleanInput source="status" />
            <TextInput source="brand" />
            <NumberInput source="benchmark" />
            <ReferenceInput source="category" reference="category" />
            {/* <TextInput source="category" /> */}
            <NumberInput source="stock" />
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
            <NumberInput source="weight" />
            <TextInput source="description" />
            <ImageInput source="image" />
            <BooleanInput source="status" />
            <TextInput source="brand" />
            <NumberInput source="benchmark" />
            <ReferenceInput source="category" reference="category" />
            {/* <TextInput source="category" /> */}
            <NumberInput source="stock" />

            {/* <ReferenceInput source="userId" reference="users" /> */}
            {/* <TextInput source="id" /> */}
            {/* <TextInput disabled source="title" /> */}
            {/* <TextInput source="title" /> */}
            {/* <TextInput source="body" /> */}
            {/* <TextInput source="body" /> */}
        </SimpleForm>
    </Create>
);