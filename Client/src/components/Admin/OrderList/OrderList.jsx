
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
        } from 'react-admin';

        export const OrderList = () => (
            <List>
                <Datagrid >
                    <TextField source="user_id" />
                    <TextField source="Products_id" />
                    <EditButton/>
                </Datagrid>
            </List>
        );    