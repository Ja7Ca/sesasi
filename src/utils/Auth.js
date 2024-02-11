import Cookies from "js-cookie";

const Auth = {
    isAuthorization() {
        if (Cookies.get("token")) return true;
        return null;
    },
    getAccessToken() {
        return Cookies.get("token");
    },
    signOut() {
        Cookies.remove("token");
    },
    storeUserInfoToCookie(data) {
        if (!data) return null;
        Cookies.set("token", data);
        return data;
    },
};

export default Auth;
