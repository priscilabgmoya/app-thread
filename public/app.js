"use strict";
function createMainTweet() {
    const id = crypto.randomUUID();
    const tweet = createTweet();
    return {
        id, tweets: [tweet]
    };
}
function createTweet() {
    const id = crypto.randomUUID();
    const message = '';
    return {
        id, message
    };
}
function renderView(tweetView) {
    var _a;
    let view = document.querySelector(`#container-${tweetView.id}`);
    if (view) {
        view.innerHTML = "";
    }
    else {
        view = document.createElement("div");
        view.id = `container-${tweetView.id}`;
        view.classList.add("mainContainer");
        (_a = document.querySelector(".tweets")) === null || _a === void 0 ? void 0 : _a.append(view);
    }
    for (let i = 0; i < tweetView.tweets.length; i++) {
        let flag = i === tweetView.tweets.length - 1;
        renderTweet(tweetView, view, tweetView.tweets[i], flag);
    }
}
function renderTweet(tweetView, view, tweet, last) {
    const tweetContainer = document.createElement("div");
    tweetContainer.id = `#container-${tweet.id}`;
    tweetContainer.classList.add("tweetContainer");
    const form = document.createElement("form");
    form.id = `form-${tweet.id}`;
    tweetContainer.append(form);
    const textArea = document.createElement("textarea");
    textArea.id = `textArea+${tweet.id}`;
    textArea.value = tweet.message;
    textArea.maxLength = 250;
    const buttonAddMore = document.createElement("button");
    buttonAddMore.classList.add("button", "buttonNew");
    buttonAddMore.innerText = "+";
    // listeners
    buttonAddMore.addEventListener("click", (e) => {
        e.preventDefault();
        const anotherTweet = createTweet();
        tweetView.tweets.push(anotherTweet);
        renderView(tweetView);
    });
    textArea.addEventListener("input", (e) => {
        const value = e.target.value;
        updateTweet(tweetView, tweet, value);
    });
    form.append(textArea);
    if (last) {
        form.appendChild(buttonAddMore);
    }
    view.append(tweetContainer);
}
function updateTweet(tweetView, tweet, value) {
    let ref = null;
    for (let i = 0; i < tweetView.tweets.length; i++) {
        const t = tweetView.tweets[i];
        if (t.id === tweet.id) {
            ref = t;
        }
        if (ref) {
            ref.message = value;
        }
    }
}
const btnNewTweet = document.querySelector(".btnNewTweet");
const containerTweet = document.querySelector(".tweets");
const tweetsData = [];
btnNewTweet.addEventListener("click", (e) => {
    e.preventDefault();
    const newTweetView = createMainTweet();
    renderView(newTweetView);
});
