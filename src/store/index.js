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
        current_estimation_accessories: [],
        new_estimations: [],
        orders: [],
        current_order: [],
        new_user: [],
        vehicles: [],
        modal_popup: {
            isModal: false,
            msg: ``
        },
        uploaded_file: [],
        general_errors: {
            isError: false,
            errorData: {}
        },
        modals_toggle: {
            isEditVehicleOpen: false
        },
        date_range: {
            createdFrom: 0,
            createdTo: new Date().getTime()
        },
        rating: [],
        account_validation: {
            isRequired: false,
            msg: ``
        },
        accessories: [],
        new_accessory: [],
        vehicles_data: [],
        inseption_date_of_cover: {
            date: 0,
            isSet: false
        },
        payments: [],
        current_payment: [],
        validation_code: {
            isSet: false,
            code: ``
        },
        reset_password: [],
        is_changes_needed: false,
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
        SET_INSEPTION_DATE_OF_COVER(state, payload) {
            state.inseption_date_of_cover.date = payload.date;
            state.inseption_date_of_cover.isSet = payload.isSet;
        },
        SET_ACCOUNT_VALIDATION(state, payload) {
            state.account_validation = payload;
        },
        SET_MODALS_TOGGLE(state, payload) {
            state.modals_toggle = payload;
        },
        SET_GENERAL_ERRORS(state, payload) {
            if (payload.response) {
                state.general_errors.isError = true;
                state.general_errors.errorData = {
                    data: payload.response.data,
                    status: payload.response.status,
                    headers: payload.response.headers
                }
            } else if (payload.request) {
                state.general_errors.isError = true;
                state.general_errors.errorData = {
                    request: payload.request
                }
            } else {
                state.general_errors.isError = true;
                state.general_errors.errorData = {
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
        SET_CURRENT_ESTIMATION_ACCESSORIES(state, payload) {
            state.current_estimation_accessories = payload;
        },
        SET_NEW_ESTIMATIONS(state, payload) {
            state.new_estimations.push(payload);
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
        },
        SET_ACCESSORIES(state, payload) {
            state.accessories = payload;
        },
        SET_NEW_ACCESSORY(state, payload) {
            state.new_accessory = payload;
        },
        SET_VEHICLES_DATA(state, payload) {
            state.vehicles_data = payload
        },
        SET_PAYMENTS(state, payload) {
            state.payments = payload;
        },
        SET_CURRENT_PAYMENT(state, payload) {
            state.current_payment = payload;
        },
        SET_VALIDATION_CODE(state, payload) {
            state.validation_code = payload;
        },
        SET_PASSWORD_RESET(state, payload) {
            state.reset_password = payload;
        },
        SET_NEEDED_CHANGES(state, payload) {
            state.is_changes_needed = !state.is_changes_needed;
        },
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

                        if (resp.data.token) {
                            commit('auth_success', {
                                token,
                                user,
                                role,
                                tokenExpirationTime
                            });
                            commit(`SET_ORDERS`, []);
                            resolve(resp);
                        } else {
                            if (resp.data.actionRequired) {
                                commit('auth_error');
                                commit(`SET_ACCOUNT_VALIDATION`, {
                                    isRequired: true,
                                    msg: resp.data.actionRequired
                                })
                            }
                        }

                    })
                    .catch(err => {
                        alert(`Something went wrong. Please, try again later.`);
                        commit('auth_error');
                        reject(err);
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
            await Axios.post(`${BASE_URL}/accounts`, payload).then((resp) => {
                let data = resp.data;
                context.commit('SET_REGISTRATION', data);

            }).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_PRODUCT_CATEGORIES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/categories`);
            context.commit('SET_PRODUCT_CATEGORIES', data);
        },
        CREATE_PRODUCT_CATEGORY: async (context, payload) => {
            await Axios.post(`${BASE_URL}/categories`, payload).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_USERS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/accounts${payload}`);
            context.commit('SET_USERS_ARRAY', data);
        },
        MODIFY_USER: async (context, payload) => {
            await Axios.post(`${BASE_URL}/accounts`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_NEEDED_CHANGES`, data);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_MAIN_PRODUCTS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/mainProducts${payload}`);
            context.commit('SET_MAIN_PRODUCTS', data);
        },
        CREATE_MAIN_PRODUCT: async (context, payload) => {
            await Axios.post(`${BASE_URL}/mainProducts`, payload).then(() => {
                context.commit(`SET_NEEDED_CHANGES`);
            }).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_SUB_PRODUCTS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/subProducts${payload}`);
            context.commit(`SET_SUB_PRODUCTS`, data);
        },
        CREATE_SUB_PRODUCT: async (context, payload) => {
            await Axios.post(`${BASE_URL}/subProducts`, payload).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_VEHICLES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/vehicles${payload}`);
            context.commit(`SET_VEHICLES`, data);
        },
        CREATE_VEHICLE: async (context, payload) => {
            await Axios.post(`${BASE_URL}/vehicles`, payload).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_ESTIMATIONS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/estimations${payload}`).catch((error) => {
                console.log(error);
                context.commit(`SET_GENERAL_ERRORS`, error);
            })
            context.commit(`SET_ESTIMATIONS`, data);
        },
        CREATE_ESTIMATION: async (context, payload) => {
            Axios.post(`${BASE_URL}/estimations`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_CURRENT_ESTIMATION`, data);
                    context.commit(`SET_NEW_ESTIMATIONS`, data);
                    context.commit(`SET_NEEDED_CHANGES`);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        CREATE_ESTIMATION_ACCESSORIES: async (context, payload) => {
            Axios.post(`${BASE_URL}/estimations`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_CURRENT_ESTIMATION_ACCESSORIES`, data);
                    context.commit(`SET_NEEDED_CHANGES`);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
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
                    context.commit(`SET_NEEDED_CHANGES`);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        CREATE_USER: async (context, payload) => {
            Axios.post(`${BASE_URL}/accounts`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_NEW_USER`, data);
                }
            ).catch((error) => {
                alert(`A client with this ID Number or email already exists.`);
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
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_RATING: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/resources${payload}`);
            context.commit(`SET_RATING`, data);

        },
        MODIFY_RATING: async (context, payload) => {
            await Axios.post(`${BASE_URL}/resources`, payload).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_ACCESSORIES: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/accessories${payload}`);
            context.commit(`SET_ACCESSORIES`, data);
        },
        CREATE_ACCESSORY: async (context, payload) => {
            Axios.post(`${BASE_URL}/accessories`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_NEW_ACCESSORY`, data);
                    context.commit(`SET_NEEDED_CHANGES`);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_VEHICLES_DATA: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/vehiclesData${payload}`);
            context.commit(`SET_VEHICLES_DATA`, data);
        },
        CREATE_VEHICLES_DATA: async (context, payload) => {
            await Axios.post(`${BASE_URL}/vehiclesData`, payload).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        GET_PAYMENTS: async (context, payload) => {
            let {
                data
            } = await Axios.get(`${BASE_URL}/payment`);
            context.commit(`SET_PAYMENTS`, data);
        },
        CREATE_PAYMENT: async (context, payload) => {
            await Axios.post(`${BASE_URL}/payment`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_CURRENT_PAYMENT`, data);
                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
                alert(`Something went wrong. Please, try again later.`);
            })
        },
        RESET_PASSWORD: async (context, payload) => {
            await Axios.post(`${BASE_URL}/resetPassword`, payload).then(
                resp => {
                    let data = resp.data;
                    context.commit(`SET_PASSWORD_RESET`, data);
                    context.commit(`SET_GENERAL_ERRORS`, {
                        isError: false,
                        errorData: {}
                    });

                }
            ).catch((error) => {
                context.commit(`SET_GENERAL_ERRORS`, error);
            })
        }
    },
});