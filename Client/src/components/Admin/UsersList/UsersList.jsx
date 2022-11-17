
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
        BooleanInput,
        BooleanField,
        } from 'react-admin';


const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    // <ReferenceInput source="categoryId" label="category" reference="products" />,
    // <ReferenceInput source="name" label="name" reference="name"/>
]

export const UsersList = () => (
    <List
          perPage={5}
          sort={{field: 'name', order: 'desc'}}
          filters={userFilters}
          >
        <Datagrid >
            <TextField source="id" />
            <TextField source="full_name" />
            <TextField source="email" />
            <BooleanField source="status" />
            <BooleanField source="isAdmin" />
            <EditButton/>
         </Datagrid>
    </List>
);

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="full_name" />
            <TextInput source="email" type="email" disabled/>
            <BooleanInput source="status" />
            <BooleanInput source="isAdmin" />
        </SimpleForm>
    </Edit>
);
