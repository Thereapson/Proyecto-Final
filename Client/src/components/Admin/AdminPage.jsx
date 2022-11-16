// in src/App.js
import * as React from "react";
import { Layout, Admin, Resource } from 'react-admin';
//import {ContainerLayout} from '@react-admin/ra-navigation'
import {Link} from 'react-router-dom'
import { Route } from "react-router-dom";
import {ProductList, ProductEdit, ProductCreate } from "./ProductList/ProductList"
import {CategoryList, CategoryEdit, CategoryCreate} from "./CategoryList/CategoryList";
import {InfoAdmin} from './InfoAdmin/InfoAdmin'
import {UsersList, UsersEdit} from "./UsersList/UsersList"
import Navbar from '../navbar/navbar';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Dashboard} from './Dashboard/index'
import {LayoutM} from './LayoutM/LayoutM'
import { lightTheme, darkTheme } from "./layout/themes";


//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import dataProvider from "../../utils/dataProvider"

const AdminPage = () => (
            <Admin 
                layout={LayoutM} 
                basename="/admin" 
                dataProvider={dataProvider} 
                theme={lightTheme}
                > 
                <Resource name="Dashboard" list={Dashboard}/>
                <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={InventoryIcon} />
                <Resource name="category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate}  recordRepresentation="name" icon={ClassIcon}/>
                <Resource name="users" list={UsersList} edit={UsersEdit} icon={PeopleIcon}/>                
            </Admin> 
        )

export default AdminPage;