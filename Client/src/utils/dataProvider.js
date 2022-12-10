import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from "axios"
import uploadImage from "../utils/uploadImage"
import FormData from 'form-data'

const apiUrl = '/admin';
const httpClient = fetchUtils.fetchJson;
console.log("httpClient",httpClient)
const baseUrl = "https://back-production-final.up.railway.app" || 
"http://localhost:3001";



const dataProvider = {
    getList: (resource, params) => {
        console.log("params", params)
        console.log("resource", resource)
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
        console.log('query', query)
        const url = `${baseUrl}${apiUrl}/${resource}?${stringify(query)}`;
        console.table("getList",page, perPage, field, order, query, url)
        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('x-total-count')) {
                throw new Error(
                    'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(
                    parseInt(headers.get('x-total-count').split('/').pop(), 10), 10
                ),
            };
        }
        );
    },

    getOne: async (resource, params) => {
        console.log("resource:",resource, "params:" , params)
        console.log(`${apiUrl}/${resource}/${params.id}`)
        try {
            const response = await axios.get(`${baseUrl}${apiUrl}/${resource}/${params.id}`)
            // console.log("response",response.data) 
            console.table("getOne",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    getMany: (resource, params) => {
        console.log("getMany")
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${baseUrl}${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        console.log("getManyReference")
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${baseUrl}${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    create: async (resource, params) => {
        console.log("create", resource, params.data)
        try {
            const response = await axios.post(`${baseUrl}${apiUrl}/${resource}/add/`, params.data)
            console.log("response",response.data) 
            //console.table("create",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    update: async (resource, params) => {
        console.log("update", resource, params)
         try {
            const response = await axios.put(`${baseUrl}${apiUrl}/${resource}/update/${params.id}`, params.data)
            console.table("update",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    updateMany: (resource, params) => {
        console.log("updateMany")
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${baseUrl}${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },


    delete: async (resource, params) => {
        try {
            const response = await axios.get(`${baseUrl}${apiUrl}/${resource}/delete/${params.id}`)
            console.table("delete",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    deleteMany: (resource, params) => {
        console.log("deleteMany")
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${baseUrl}${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    getCloudinary: (image) => {
        let url = uploadImage(image)
        if (url) {
            return (url)
        } else {
            return null
        }
    },


};



export default dataProvider;