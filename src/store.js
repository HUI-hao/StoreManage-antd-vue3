import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: undefined,
        sessionId: undefined,
        loginTime: undefined,
    },
    mutations: {
        setUsername: function (state, username) {
            state.username = username;
        },
        clearUsername: function (state) {
            state.username = undefined;
        },
        setSessionId: function (state , sessionId)
        {
            state.sessionId = sessionId;
        },
        clearSessionId: function (state) {
            state.sessionId = undefined;
        },
        setLoginTime: function (state, loginTime) {
            state.loginTime = loginTime;
        },
        clearLoginTime: function (state) {
            state.loginTime = undefined;
        },
    },
    actions: {

    },
})