
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    required,
    minLength,
    maxLength,
} from 'react-admin';

// const PostTitle = () => {
//     const record = useRecordContext()
//     return <span> Post {record? `"${record.title}`: ""}</span>
// }

// const postFilters = [
//     <TextInput source="q" label="Search" alwaysOn />,
//     <ReferenceInput source="id" label="productId" reference="products" />,
//     <ReferenceInput source="title" label="Title" reference="title" />
// ]


const validateName = [required(), minLength(5), maxLength(30)]
const validateDescription = [required(), minLength(20), maxLength(200)]

export const CategoryList = () => (
    <List>
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);