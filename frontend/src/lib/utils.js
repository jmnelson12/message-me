const str = (function () {
    const isValid = function (text) {
        return text && text.length !== 0;
    }

    return {
        isValid
    }
})();

const setMouseStyle = function (style) {
    document.body.style.cursor = style;
}

const MS_WAIT = "wait";
const MS_DEFAULT = "default";

export { str, setMouseStyle, MS_WAIT, MS_DEFAULT }
