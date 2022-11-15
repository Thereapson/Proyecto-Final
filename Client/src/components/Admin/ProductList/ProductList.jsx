
import * as React from "react";
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
        ImageInput
        } from 'react-admin';

const PostTitle = () => {
    const record = useRecordContext()
    return <span> Post {record? `"${record.title}`: ""}</span>
}

const productFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="_id" label="productId" reference="products" />,
    // <ReferenceInput source="title" label="Title" reference="title" />
]


export const ProductList = () => (
    <List perPage={15} sort={{field: 'name', order: 'desc'}}>
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
            <TextInput source="sku" />
            <TextInput source="name" />
            <NumberInput source="price" />
            <NumberInput source="weight" />
            <TextInput source="description" />
            <TextInput source="image" />
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
            {/* <TextInput disabled source="id" /> */}
            <ReferenceInput source="userId" reference="users" />
            {/* <TextInput disabled source="title" /> */}
            <TextInput source="title" />
            {/* <TextInput source="body" /> */}
            <TextInput source="body" />
        </SimpleForm>
    </Create>
);