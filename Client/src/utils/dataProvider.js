import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from "axios"

const apiUrl = 'http://localhost:3001/admin';
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // const url = `${apiUrl}/${resource}`;
        console.table("getList",page, perPage, field, order, query, url)

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('x-total-count')) {
                console.log(headers.get('x-total-count'))
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
        });
    },

    getOne: async (resource, params) => {
        console.log("resource:",resource, "params:" , params)
        console.log(`${apiUrl}/${resource}/${params.id}`)
        try {
            const response = await axios.get(`${apiUrl}/${resource}/${params.id}`)
            // console.log("response",response.data) 
            console.table("getOne",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    // getOne: (resource, params) =>    
    //     httpClient(`${apiUrl}/products/detail/${params.id}`)
    //     // .then(({ json }) => (console.log({
    //     //     data: json,
    //     // })))
    //     .then(({ json }) => ({
    //         data: json,
    //     }))
    //     ,

    getMany: (resource, params) => {
        console.log("getMany")
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
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
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({
    //         data: { ...params.data, id: json.id },
    //     })),


    create: async (resource, params) => {
        console.log("create")
        try {
            const response = await axios.post(`${apiUrl}/${resource}/add`)
            // console.log("response",response.data) 
            console.table("create",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    // update: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json })),

    update: async (resource, params) => {
        // console.log("update", resource, params)
         try {
            const response = await axios.put(`${apiUrl}/${resource}/update/${params.id}`, params.data)
            // console.log("response",response.data) 
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
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },


    delete: async (resource, params) => {
        console.log("delete", resource, params)
        try {
            const response = await axios.get(`${apiUrl}/${resource}/${params.id}`)
            // console.log("response",response.data) 
            console.table("delete",resource, params, response)
            return ({data: response.data}) 
        } catch (error) {
            return ({error: error.message})
        }
    },

    // delete: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'DELETE',
    //     }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        console.log("deleteMany")
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;