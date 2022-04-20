/**
 * inject css as a style tag
 */
export const injectSettingsCss = (css: string, classId = "Crankshaft-settings-css") => {
    let s = document.createElement("style");
    //s.setAttribute("class", classId);
    s.setAttribute("id", classId);
    s.innerHTML = css;
    document.head.appendChild(s);
}

//create element util function. source is my utils lib: https://github.com/KraXen72/roseboxlib/blob/master/esm/lib.js
//yes the typing on this function is shit pr a fix if you have a better idea
/**
 * create a dom element given an object of properties
 * @param type element type, e.g. "div"
 * @param options options for the element. like class, id, etc
 * @returns element
 */
export function createElement(type: string, options: object = {}) {
    const element = document.createElement(type)

    Object.entries(options).forEach(([key, value]) => {
        if (key === "class") {
            //@ts-ignore
            element.classList.add(value)
            return
        }

        if (key === "dataset") {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                //@ts-ignore
                element.dataset[dataKey] = dataValue
            })
            return
        }

        if (key === "text") {
            //@ts-ignore
            element.textContent = value
            return
        }
        if (key === "innerHTML") {
            //@ts-ignore
            element.innerHTML = value
            return
        }
        //@ts-ignore
        element.setAttribute(key, value)
    })
    return element
}

/**
 * inject or uninject css to hide ads
 * @param value 'toggle'|Boolean
 */
export function toggleAdhideCSS(value: 'toggle' | Boolean = 'toggle') {
    let styleTag = document.getElementById("teeny-tiny-css-snippet")
    const rule = `#aMerger,#aHolder,#adCon,#braveWarning,.endAHolder { display: none !important }`

    function create() {
        styleTag = createElement("style", {id: "teeny-tiny-css-snippet", innerHTML: rule})
        document.head.appendChild(styleTag)
    }

    if (value === 'toggle') {
        //normal toggle
        if (styleTag == null) {
            create()
        } else {
            styleTag.remove()
        }
    } else {
        if (styleTag == null && value === true) {
            create()
        } else if (styleTag !== null && value === false) {
            try { styleTag.remove() } catch (e) {  }
        }
    }
}
