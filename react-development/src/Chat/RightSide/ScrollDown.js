function ScrollDown({id}) {
    let chat = document.getElementById({id});
    chat.scrollTop = chat.scrollHeight;
}

export default ScrollDown;