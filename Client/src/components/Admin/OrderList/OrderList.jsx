
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
                    <TextField source="id" />
                    <TextField source="user" />
                    <TextField source="ammount" />
                    <TextField source="date" />
                    {/* <TextField source="address" /> */}
                    <TextField source="product" />
                    <TextField source="payment" />
                    <TextField source="status" />

                </Datagrid>
            </List>
        );    