
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



export const UsersList = () => (
    <List>
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
            <TextInput source="email" />
            <BooleanInput source="status" />
            <BooleanInput source="isAdmin" />
        </SimpleForm>
    </Edit>
);
