import { userService } from '../../helpers/authservice/user.service';
import router from '../../router/index'

const user = JSON.parse(localStorage.getItem('user'));
export const state = {
    currentUser: user,
}
export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    }
}
export const actions = {
    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    login({ dispatch, commit, getters }, { email, password }) {
        if (getters.loggedIn) return dispatch('validate')
        commit('loginRequest', { email });

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    },
    // Logout the user
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    // register the user
    registeruser({ dispatch, commit }, user) {
        commit('registerRequest', user);
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    dispatch('notification/success', 'Registration successful', { root: true });
                    router.push('/login');
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    },
    validate({ state }) {
        if (!state.currentUser) return Promise.resolve(null)
        // const user = getFirebaseBackend().getAuthenticatedUser();
        // commit('SET_CURRENT_USER', user)
        return state.currentUser;
    },
};

export const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.currentUser = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.currentUser = user;
    },
    loginFailure(state) {
        state.status = {};
        state.currentUser = null;
    },
    logout(state) {
        state.status = {};
        state.currentUser = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    },
    // SET_CURRENT_USER(state, newValue) {
    //     state.currentUser = newValue
    //     saveState('auth.currentUser', newValue)
    // }
};

