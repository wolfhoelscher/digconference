export default class App {


    /**
     * init - Initialize the app
     * @return {void} Not meant to return
     */
    static init() {

        document.documentElement.className = "js";
    }

}

var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    App.init();
});