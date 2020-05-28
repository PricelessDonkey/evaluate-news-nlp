function checkForUrl(inputText) {
    let regExpression = new RegExp("^(http|https)://", "i");
    return regExpression.test(inputText);
}

export { checkForUrl }
