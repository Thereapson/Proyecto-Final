
import * as React from "react";
import {
    List,
    ReferenceField,
} from 'react-admin';


export const InfoAdmin = () => (
    <>
        <List >
            <ReferenceField emptyText="Datos de Usuario Admin" />
        </List>
    </>
);

