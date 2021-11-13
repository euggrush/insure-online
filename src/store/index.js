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
        user: ``,
        my_role: ``,
        product_categories: [],
        users_array: [],
        main_products: [],
        sub_products: []
    },
    plugins: [
        createLogger(),
        createPersistedState({
            paths: ['my_role', 'token', 'user', 'status'],
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
        auth_success(state, payload) {
            state.status = 'success'
            state.token = payload.token
            state.user = payload.user;
            state.my_role = payload.role;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ``;
            state.token = ``;
            state.user = ``;
            state.my_role = ``;
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
        }
    },
    actions: {
        LOGIN({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                Axios({
                        url: `${BASE_URL}/api/authorization`,
                        data: payload,
                        method: `POST`
                    })
                    .then(resp => {

                        const token = resp.data.token;
                        const user = resp.data;
                        const role = resp.data.role;
                        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        commit('auth_success', {
                            token,
                            user,
                            role
                        });

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
            } = await Axios.post(`${BASE_URL}/api/accounts`, payload);
            context.commit('SET_REGISTRATION', data);
        },
        GET_PRODUCT_CATEGORIES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/api/categories`);
            context.commit('SET_PRODUCT_CATEGORIES', data);
        },
        CREATE_PRODUCT_CATEGORY: async (context, payload) => {
            await Axios.post(`${BASE_URL}/api/categories`, payload);
        },
        GET_USERS: async (context) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/api/accounts`);
            context.commit('SET_USERS_ARRAY', data);
        },
        MODIFY_USER: async (context, payload) => {
            await Axios.post(`${BASE_URL}/api/accounts`, payload);
        },
        GET_MAIN_PRODUCTS: async (context) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/api/mainProducts`);
            context.commit('SET_MAIN_PRODUCTS', data);
        },
        GET_SUB_PRODUCTS: async (context) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/api/subProducts`);
            context.commit('SET_SUB_PRODUCTS', data);
        },
    },
});