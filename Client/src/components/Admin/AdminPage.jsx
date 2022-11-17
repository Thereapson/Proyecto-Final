// in src/App.js
import * as React from "react";
import { ProductList, ProductEdit, ProductCreate } from "./ProductList/ProductList"
import { CategoryList, CategoryEdit, CategoryCreate } from "./CategoryList/CategoryList";
import { UsersList, UsersEdit } from "./UsersList/UsersList";
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Dashboard } from './Dashboard/index'
import { LayoutM } from './LayoutM/LayoutM'
import { lightTheme } from "./layout/themes";


import dataProvider from "../../utils/dataProvider"

const AdminPage = () => (
    <Admin
        layout={LayoutM}
        basename="/admin"
        dataProvider={dataProvider}
        theme={lightTheme}
    >
        <Resource name="Dashboard" list={Dashboard} />
        <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={InventoryIcon} />
        <Resource name="category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} recordRepresentation="name" icon={ClassIcon} />
        <Resource name="users" list={UsersList} edit={UsersEdit} icon={PeopleIcon} />
    </Admin>
)

export default AdminPage;