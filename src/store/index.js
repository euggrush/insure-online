/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import Axios from 'axios';

import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
let ls = new SecureLS({
    encodingType: "aes",
    isCompression: false,
    encryptionSecret: "Your key"
});

export const store = new Vuex.Store({
    state: {
        status: '',
        token: '',
        user: []
    },
    plugins: [
        createPersistedState({
            paths: ['is_admin', 'token'],
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
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, payload) {
            state.status = 'success'
            state.token = token
            state.user.push(payload);
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        LOGIN({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios({
                        url: `https://get-online.online/api/authorization`,
                        data: payload,
                        method: 'POST'
                    })
                    .then(resp => {

                        const token = resp.data.token
                        const id = resp.data.accountId
                        const user = resp.data
                        // const isAdmin = resp.data.account.isAdmin || false

                        // commit('SET_ADMIN', isAdmin)

                        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        commit('auth_success', token, user)
                        resolve(resp)
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

    },
});