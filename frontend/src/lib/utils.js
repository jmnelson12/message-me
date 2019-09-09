const str = (function () {
    const isValid = function (text) {
        return text && text.length !== 0;
    }

    return {
        isValid
    }
})();

export { str }
