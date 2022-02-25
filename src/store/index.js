/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import Axios from 'axios';
import {
    createLogger
} from 'vuex';

import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
let ls = new SecureLS({
    encodingType: "aes",
    isCompression: false,
    encryptionSecret: "Your key"
});

import {
    BASE_URL
} from '../constants';

export const store = new Vuex.Store({
    state: {
        status: ``,
        token: ``,
        toke_expiration_time: ``,
        user: ``,
        my_role: ``,
        product_categories: [],
        users_array: [],
        main_products: [],
        sub_products: [],
        estimations: [],
        current_estimation: [],
        orders: [],
        current_order: [],
        new_user: [],
        vehicles: [],
        modal_popup: {
            isModal: false,
            msg: ``
        },
        uploaded_file: [],
        general_errors: {},
        modals_toggle: {
            isEditVehicleOpen: false
        },
        date_range: {
            createdFrom: 0,
            createdTo: new Date().getTime()
        },
        rating: []
    },
    plugins: [
        createLogger(),
        createPersistedState({
            paths: ['my_role', 'token', 'user', 'status', 'toke_expiration_time'],
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) =>
                    ls.set(key, value, {
                        expires: 7
                    }),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],
    mutations: {
        SET_MODALS_TOGGLE(state, payload) {
            state.modals_toggle = payload;
        },
        SET_GENERAL_ERRORS(state, payload) {
            if (payload.response) {
                state.general_errors = {
                    data: payload.response.data,
                    status: payload.response.status,
                    headers: payload.response.headers
                }
            } else if (payload.request) {
                state.general_errors = {
                    request: payload.request
                }
            } else {
                state.general_errors = {
                    error: payload.message
                }
            }
            console.log(payload.config);
        },
        SET_DATE_RANGE(state, payload) {
            state.date_range = payload;
        },
        auth_success(state, payload) {
            state.status = 'success'
            state.token = payload.token
            state.user = payload.user;
            state.my_role = payload.role;
            state.toke_expiration_time = payload.tokenExpirationTime;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ``;
            state.token = ``;
            state.user = ``;
            state.my_role = ``;
            state.toke_expiration_time = ``;
        },
        SET_REGISTRATION(state, payload) {
            state.user = payload;
            state.my_role = payload.role;
        },
        SET_PRODUCT_CATEGORIES(state, payload) {
            state.product_categories = payload;
        },
        SET_USERS_ARRAY(state, payload) {
            state.users_array = payload;
        },
        SET_MAIN_PRODUCTS(state, payload) {
            state.main_products = payload;
        },
        SET_SUB_PRODUCTS(state, payload) {
            state.sub_products = payload;
        },
        SET_ESTIMATIONS(state, payload) {
            state.estimations = payload;
        },
        SET_CURRENT_ESTIMATION(state, payload) {
            state.current_estimation = payload;
        },
        SET_ORDERS(state, payload) {
            state.orders = payload;
        },
        SET_CURRENT_ORDER(state, payload) {
            state.current_order = payload;
        },
        SET_NEW_USER(state, payload) {
            state.new_user = payload;
        },
        SET_VEHICLES(state, payload) {
            state.vehicles = payload;
        },
        SET_MODAL(state, payload) {
            state.modal_popup.isModal = payload.isModal;
            state.modal_popup.msg = payload.msg;
        },
        SET_UPLOADED_FILE(state, payload) {
            state.uploaded_file = payload;
        },
        SET_RATING(state, payload) {
            state.rating = payload;
        }
    },
    actions: {
        LOGIN({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                Axios({
                        url: `${BASE_URL}/authorization`,
                        data: payload,
                        method: `POST`
                    })
                    .then(resp => {

                        const token = resp.data.token;
                        const tokenExpirationTime = resp.data.tokenExpirationTime;
                        const user = resp.data;
                        const role = resp.data.role;
                        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        commit('auth_success', {
                            token,
                            user,
                            role,
                            tokenExpirationTime
                        });
                        commit(`SET_ORDERS`, []);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        LOGOUT({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                delete Axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        REGISTRATION: async (context, payload) => {
            let {
                data
            } = await Axios.post(`${BASE_URL}/accounts`, payload);
            context.commit('SET_REGISTRATION', data);
        },
        GET_PRODUCT_CATEGORIES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/categories`);
            context.commit('SET_PRODUCT_CATEGORIES', data);
        },
        CREATE_PRODUCT_CATEGORY: async (context, payload) => {
            await Axios.post(`${BASE_URL}/categories`, payload);
        },
        GET_USERS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/accounts${payload}`);
            context.commit('SET_USERS_ARRAY', data);
        },
        MODIFY_USER: async (context, payload) => {
            await Axios.post(`${BASE_URL}/accounts`, payload);
        },
        GET_MAIN_PRODUCTS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/mainProducts${payload}`);
            context.commit('SET_MAIN_PRODUCTS', data);
        },
        CREATE_MAIN_PRODUCT: async (context, payload) => {
            await Axios.post(`${BASE_URL}/mainProducts`, payload);
        },
        GET_SUB_PRODUCTS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/subProducts${payload}`);
            context.commit(`SET_SUB_PRODUCTS`, data);
        },
        CREATE_SUB_PRODUCT: async (context, payload) => {
            await Axios.post(`${BASE_URL}/subProducts`, payload);
        },
        GET_VEHICLES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/vehicles${payload}`);
            context.commit(`SET_VEHICLES`, data);
        },
        CREATE_VEHICLE: async (context, payload) => {
            await Axios.post(`${BASE_URL}/vehicles`, payload);
        },
        GET_ESTIMATIONS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/estimations${payload}`);
            context.commit(`SET_ESTIMATIONS`, data);
        },
        CREATE_ESTIMATION: async (context, payload) => {
            Axios.post(`${BASE_URL}/estimations`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_CURRENT_ESTIMATION`, data)
                }
            )
        },
        GET_ORDERS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/orders${payload}`);
            context.commit(`SET_ORDERS`, data);
        },
        CREATE_ORDER: async (context, payload) => {
            Axios.post(`${BASE_URL}/orders`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_CURRENT_ORDER`, data);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
            })
        },
        CREATE_USER: async (context, payload) => {
            Axios.post(`${BASE_URL}/accounts`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_NEW_USER`, data);
                }
            ).catch((error) => {
                context.commit(`SET_NEW_USER`, error);
                context.commit(`SET_GENERAL_ERRORS`, error);
            })
        },
        UPLOAD: async (context, payload) => {
            Axios.post(`${BASE_URL}/assets?act=upload`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_UPLOADED_FILE`, data);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
            })
        },
        GET_RATING: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/resources${payload}`);
            context.commit(`SET_RATING`, data);

        },
        MODIFY_RATING: async (context, payload) => {
            await Axios.post(`${BASE_URL}/resources`, payload);
        },
    },
});