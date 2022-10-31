export function isValidDate(str) {
    let year = str.slice(0, 4);
    if (Number(year) < 1950 || Number(year) > 2023 || str.length > 10) {
      return true;
    } else {
      return false;
    }
  }

export function isValiddescription(str) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  
    return regex.test(str);
  }

export function hasSpecialChars(str) {
    const regexSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regexSpecialChars.test(str);
  }

export default function validate(input) {
    const error = {};

    if (!input.sku) {
        error.sku = "SKU is required";
      } else if (hasSpecialChars(input.sku)) {
        error.sku = "SKU may not contain special characters";
      }
  
    if (!input.name) {
      error.name = "Name is required";
    } else if (hasSpecialChars(input.name)) {
      error.name = "Name may not contain special characters";
    } else if (input.name.trim() === "") {
      error.name = "Name may not be empty";
    } else if (input.name.length > 20 || input.name.length < 0) {
      error.name = `Characters in the name must be between 0 and 20`;
    }
  
    if (!input.description) {
      error.description = "Description is required";
    } else if (input.description.length > 200 || input.description.length < 0) {
        error.description = `Characters in the name must be between 0 and 200`;
      }
  
    if (!input.weight) {
      error.weight = "Weight is required";
    } 

    if (!input.brand) {
      error.brand = "Brand is required";
    } 

    if (!input.category) {
        error.category = "Category is required";
      } 
  
    if(!input.image) {
      error.image = "Url is required"
    } else if (input.image.length > 100) {
      error.image = "Invalid Url"
    }
  
    if (!input.stock) {
      error.stock = "Stock is required";
    } else if (input.stock > 20) {
      error.stock = "The maximum stock is 20 units";
    }
  
    if(!input.price) {
      error.price = "Price is required"
    } else if(hasSpecialChars(input.price)) {
      error.price = "Price may not contain special characters"
    }
  
    if (hasSpecialChars(input.address)) {
      error.address = "Address may not contain special characters";
    }
    return error;
  }