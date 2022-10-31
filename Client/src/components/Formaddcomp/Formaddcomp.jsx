import React, {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import s from "./Register.module.css";
import validate from "../../utils/validateForms"
import {addProduct} from "../../Redux/Actions/Actions"
// Estados locales para controlar el formulario

export default function FormAddComp() {

  //const categoryArrow = ['CPU','GPU','MEMORY','SSD','USB']
  let typeProducts = useSelector((state) => state.categories)
  let lastProduct = useSelector((state) => state.lastAdd)

  const categoryArrow = typeProducts?.map((elm) => {
    return elm.name
  })

  //const categoryArrow = typeProducts?.map((elm) => {return elm.name})

  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    weight: "",
    description: "",
    thumbnail: true,
    image: "",
    category: "",
    brand: "",
    stock: 0, 
  });
  // Estado para activar la validacion de cada casilla
  const [click, setClick] = useState({
    sku: false,
    name: false,
    price: false,
    weight: false,
    description: false,
    thumbnail: false,
    image: false,
    brand: false,
    category: false,
    stock: false, 
  });

  const [error, setError] = useState({sku:""})

  const handleClick = (e) => {
    if (!click[`${e.target.name}`]) {
      setClick({
        ...click,
        [e.target.name]: !click[`${e.target.name}`],
      });
    }
  };

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,      
    });
    // console.log(product)

    setError(
      validate({
        ...product,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(product)
    // console.log(error)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(
      validate({
        ...product,
        [e.target.name]: e.target.value,
      })
    );
    if (!Object.keys(error).length && product.userName !== "") {
      let idCat = idCategory(product.category)
      // console.log({...product, category: idCat.id})
      dispatch(addProduct({...product, category: idCat.id}));
      console.log("register");
    } else {
      setClick({
        sku: true,
        name: true,
        price: true,
        weight: true,
        description: true,
        thumbnail: true,
        image: true,
        category: true,
        brand: true,
        stock: true, 
      })
    }
    //e.target.reset()
    //dispatch(addProduct(product))
  };

  const idCategory = (category) => {
    let idCat = typeProducts?.find((elm) => {
      return elm.name === category
    })
    return idCat
  }


    return (
      <>  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Form for Include New Product</h3>
                <p className="mt-1 text-sm text-gray-600"> If you need include a new brand, use the selects </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                          SKU
                        </label>
                        <input
                          type="text"
                          name="sku"
                          id="sku"
                          // autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.sku}
                        />
                            {click.sku && error.sku&& (
                            <p className={s.error}>{error.sku}</p>
                          )}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          // autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.name}
                        />
                            {click.name && error.name && (
                            <p className={s.error}>{error.name}</p>
                          )}

                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          // autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="The Price must be in USD"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.price}
                        />
                            {click.price && error.price && (
                            <p className={s.error}>{error.price}</p>
                          )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                          Brand
                        </label>
                        <input
                          type="text"
                          name="brand"
                          id="brand"
                          // autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.brand}
                        />
                            {click.brand && error.brand && (
                            <p className={s.error}>{error.brand}</p>
                          )}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                          Weight
                        </label>
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          // autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="The Weight must be in Kg"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.weight}
                        />
                            {click.weight && error.weight && (
                            <p className={s.error}>{error.weight}</p>
                          )}
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Must not be more than 200 characters"
                          // defaultValue={''}
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.description}
                      />
                           {click.description && error.description && (
                            <p className={s.error}>{error.description}</p>
                          )}                       
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                          Image
                        </label>
                        <input
                          type="text"
                          name="image"
                          id="image"
                          // autoComplete="address-level2"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="http://"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.image}
                        />
                            {click.image && error.image && (
                            <p className={s.error}>{error.image}</p>
                          )}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          // autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.category}
                        >
                          <option> </option>
                          {
                            categoryArrow && categoryArrow?.map(function(elm, index) {
                              return (
                                <option key={index}> {elm} </option>
                              )
                            })
                          }
                        </select>
                            {click.category && error.category && (
                            <p className={s.error}>{error.category}</p>
                          )}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          // autoComplete="postal-code"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          onClick={handleClick}
                          value={product.stock}
                        />
                            {click.stock && error.stock && (
                            <p className={s.error}>{error.stock}</p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {
                    Object.keys(error).length === 0? 
                    <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Add Product
                  </button>
                    : 
                    <button
                    disabled
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-50 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Product
                  </button>
                  }
                  </div>
                </div>
              </form>
              <div>
                {lastProduct?.msg? 
                <h1> The product was store with id {`${lastProduct.newProduct._id}`} </h1>
              :
              <>
                  {lastProduct?.stack?  
                   <h1 className="text-orange-600"> The product was not stored, review the information</h1>:
                   <></>
                   }
              </>         
              }
              </div>
            </div>
          </div>
        </div>     
      </>
    )
  }