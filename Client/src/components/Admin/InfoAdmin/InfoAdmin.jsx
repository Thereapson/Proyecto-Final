
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


export const InfoAdmin = () => (
    <>
    <List >
        <ReferenceField  emptyText="Datos de Usuario Admin"/>
    </List>
    </>
);

