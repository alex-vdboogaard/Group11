function showMessage(message) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message");
    message.innerHtml = `<p>${message}</p>`;
}