import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getProductsByCategory, getProductsBySearch } from "../../Redux/Actions/Actions";

const menu = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Products",
        link: "/products",
        submenu: true,
        isProducts: true,
        subMenuItems: [
            {
                Head: "CPU",
            },
            {
                Head: "GPU",

            },
            {
                Head: "RAM",
            },
            {
                Head: "HDD",
                sublink: [
                    {
                        name: "1TB",
                    },
                    {
                        name: "2TB",
                    },
                ],
            },
            {
                Head: "SSD",
            }
        ],
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Contact",
        link: "/contact",
    },
];






const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(getProductsBySearch(search));
        setSearch("");
        navigate("/products");
    };

    const handleLogin = () => {
        setIsLogin(!isLogin);
    };

    const handleCategory = (e) => {
        const category = e.target.value;
        dispatch(getProductsByCategory(category));
    };

    const handleGetAllProducts = () => {
        dispatch(getProductsByCategory(""));
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-evenly items-center py-3">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-700 ml-2">LOGO</span>
                        <div className="text-xl font-bold text-gray-700 ml-2">
                            <NavLink to="/">E-Commerce</NavLink>
                        </div>
                    </div>
                    {/* menu and filters */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <ul className="flex items-center">
                                {menu.map((link) => (
                                    <li className="px-3 text-left md:cursor-pointer group">

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
                                                <div className="absolute top-30 hidden group-hover:md:block hover:md:block bg-white z-10 w-64 rounded-md shadow-lg">
                                                    <div className="py-3 px-5 flex justify-between items-center">
                                                        {link.subMenuItems.map((sublink) => (
                                                            <div className="flex flex-col">
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                            <Link to="/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <circle cx="6" cy="19" r="2"></circle>
                                    <circle cx="17" cy="19" r="2"></circle>
                                    <path d="M17 17h-11v-14h-2"></path>
                                    <path d="M6 5l14 1l-1 7h-13"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    {/* user */}
                    <div className="flex items-center">
                        <Link to={isLogin ? "/products" : "/login"} className="text-gray-700 font-bold text-lg ml-2 flex items-center" onClick={handleLogin}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="12" r="9"></circle>
                                <circle cx="12" cy="10" r="3"></circle>
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                            </svg>
                            {isLogin ? "Logout" : "Login"}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;