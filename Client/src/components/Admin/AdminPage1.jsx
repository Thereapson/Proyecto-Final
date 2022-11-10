// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import {Link} from 'react-router-dom'
import { Route } from "react-router-dom";
import {ProductList, ProductEdit } from "./ProductList/ProductList"
import {CategoryList, CategoryEdit} from "./CategoryList/CategoryList";
import {InfoAdmin} from './InfoAdmin/InfoAdmin'
import {UsersList, UsersEdit} from "./UsersList/UsersList"
import Navbar from '../navbar/navbar';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Dashboard} from './Dashboard/index'

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import dataProvider from "../../utils/dataProvider"

const AdminPage1 = () => (
        <>
            <Admin basename="/admin" dataProvider={dataProvider} > 
            {/* <Resource name="users" list={UsersList} edit={UsersEdit} icon={UserIcon}>
                <Route path="admin/users" element={<ProductList/>}/>            
                </Resource>   */}
                {/* <Resource name="category" list={CategoryList} edit={CategoryEdit} icon={PostIcon} recordRepresentation="name"/> */}
                <Resource name="Dashboard" list={Dashboard}/>
                <Resource name="products" list={ProductList} edit={ProductEdit} icon={InventoryIcon} />
                <Resource name="category" list={CategoryList} edit={CategoryEdit} recordRepresentation="name" icon={ClassIcon}/>
                <Resource name="users" list={UsersList} edit={UsersEdit} icon={PeopleIcon}/>                
            </Admin> 
        </>    
        )

export default AdminPage1;