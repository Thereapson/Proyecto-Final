import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getProductsByCategory, getProductsBySearch, getCategories, getProducts, getUser, getCart, isAdmin } from "../../Redux/Actions/Actions";
import Cart from "../cart/cart";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const Navbar = ({ setCurrentPage }) => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const admin = useSelector(state => state.isAdmin);

    useEffect(() => {
        window.localStorage.getItem('id') && dispatch(getCart(window.localStorage.getItem('id')));
        window.localStorage.getItem('email') && dispatch(getUser(window.localStorage.getItem('email')));
    }, [dispatch]);

    const menu = [
        // {
        //     name: "Home",
        //     link: "/",
        // },
        {
            name: "Products",
            link: "/products",
            submenu: true,
            isProducts: true,
            subMenuItems: categories.map((category) => {
                return {
                    Head: category.name,
                }
            })
        },
        // {
        //     name: "About",
        //     link: "/about",
        // },
        // {
        //     name: "Contact",
        //     link: "/contact",
        // },
    ];
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isLogin, setIsLogin] = useState(window.localStorage.getItem('isLogged'));
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        dispatch(getCategories());
        console.log('categories', categories);
        dispatch(getProducts(window.localStorage.getItem('email')));
        dispatch(isAdmin(window.localStorage.getItem('email')));  // action para validar si el usuario es admin o no
    }, [dispatch]);

    const submitSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getProductsBySearch(search));
        setSearch("");
        navigate("/products");
    };

    const handleLogin = () => {
        setIsLogin(!isLogin)

    };

    const handleCategory = (e) => {
        const category = e.target.value;
        dispatch(getProductsByCategory(category));
        setCurrentPage(1);
    };

    const handleGetAllProducts = () => {
        setCurrentPage(1);
        dispatch(getProductsByCategory(""));
    };

    // cart 
    const [showCart, setShowCart] = useState(false);
    const handleCart = () => {
        setShowCart(true);
    };

    const quantityInCart = useSelector(state => state.cart.products?.length);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("userID");
        dispatch(isAdmin(window.localStorage.getItem('email')));                         
        navigate("/products")
    };

    return (
        <div className="bg-white relative">
            <div className="container mx-auto px-4">
                <div className="flex justify-evenly items-center py-3">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-700 ml-2">LOGO</span>
                        <div className="text-xl font-bold text-gray-700 ml-2">
                            <NavLink to="/products">CompuDevs</NavLink>
                        </div>
                    </div>
                    {/* menu and filters */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <ul className="flex items-center">
                                {menu.map((link, index) => (
                                    <li className="px-3 text-left md:cursor-pointer group" key={index}>

                                        {link.isProducts ? (
                                            <NavLink to={link.link} className="text-gray-700" onClick={handleGetAllProducts}>
                                                {link.name}
                                            </NavLink>
                                        ) : (
                                            <NavLink to={link.link} className="text-gray-700">
                                                {link.name}
                                            </NavLink>
                                        )}

                                        {link.submenu && (
                                            <div>
                                                <div className="absolute top-25 hidden group-hover:md:block hover:md:block z-20  rounded-md shadow-md bg-gray-100">
                                                    <div className="flex justify-between items-center gap-4">
                                                        {link.subMenuItems.map((sublink, index) => (
                                                            <div className="flex flex-col hover:bg-gray-200 p-2" key={index}>
                                                                <Link to={"/products"} >
                                                                    <button className="text-gray-700 font-bold text-lg" onClick={handleCategory} value={sublink.Head}>{sublink.Head}</button>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* searchbar */}
                    <div className="md:block">
                        <div className="flex items-center">
                            <div className="relative">
                                <form onSubmit={submitSearch}>
                                    <input type="text" className="bg-gray-100 rounded-full w-64 px-4 py-2 pl-8 focus:outline-none focus:shadow-outline text-center" placeholder="Search" value={search} onChange={handleSearch} />
                                </form>
                                <div className="absolute top-0 flex items-center h-full ml-2 cursor-pointer">
                                    <Link to={"/products"} >
                                        <button type="submit" className="text-gray-700 focus:outline-none focus:shadow-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <circle cx="10" cy="10" r="7"></circle>
                                                <line x1="21" y1="21" x2="15" y2="15"></line>
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* cart */}
                    <div className="flex items-center hover:cursor-pointer">
                        <div className="relative">
                            {/* cart */}
                            <button className="focus:outline-none focus:shadow-outline" onClick={() => handleCart()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <circle cx="6" cy="19" r="2"></circle>
                                    <circle cx="17" cy="19" r="2"></circle>
                                    <path d="M17 17h-11v-14h-2"></path>
                                    <path d="M6 5l14 1l-1 7h-13"></path>
                                </svg>
                            </button>
                            {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
                            {quantityInCart > 0 && <div className="absolute bottom-5 left-3 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">{quantityInCart}</div>}
                        </div>
                    </div>
                    {/* user */}
                    <div className="flex items-center">
                        <Link to={isLogin ? "/userDetail" : "/login"} className="text-gray-700 font-bold text-lg ml-2 flex items-center" onClick={handleLogin}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="12" r="9"></circle>
                                <circle cx="12" cy="10" r="3"></circle>
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                            </svg>
                            {
                                isLogin
                                    ? <button onClick={handleLogin}>Log In</button>
                                    : <button onClick={handleLogOut}>Log Out</button>
                            }
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {
                            admin[0] === true && 
                            <Link to={"/admin"} className="text-gray-700 font-bold text-lg ml-2 flex items-center">
                            {/* <AdminPanelSettingsIcon/>  */}
                            Admin
                        </Link> 
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;