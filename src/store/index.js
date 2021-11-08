/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import Axios from 'axios';
import { createLogger } from 'vuex';

import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
let ls = new SecureLS({
    encodingType: "aes",
    isCompression: false,
    encryptionSecret: "Your key"
});

export const store = new Vuex.Store({
    state: {
        status: ``,
        token: ``,
        user: ``,
        my_role: ``
    },
    plugins: [
        createLogger(),
        createPersistedState({
            paths: ['my_role', 'token'],
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
        },
        SET_REGISTRATION(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        LOGIN({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                Axios({
                        url: `https://get-online.online/api/authorization`,
                        data: payload,
                        method: `POST`
                    })
                    .then(resp => {

                        const token = resp.data.token;
                        const user = resp.data;
                        const role = resp.data.role;

                        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        commit('auth_success', {token, user, role});

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
            let {data} = await Axios.post(`https://get-online.online/api/accounts`, payload);
            context.commit('SET_REGISTRATION', data);
        },
    },
});