type Message = string;
type Title = string;
type Id = string;

interface Tweet {
    id: Id;
    message: Message;
}
interface TweetView {
    id: Id;
    tweets: Tweet[];
}

function createMainTweet(): TweetView {
    const id = crypto.randomUUID();
    const tweet = createTweet();
    return {
        id, tweets: [tweet]
    };
}

function createTweet(): Tweet {
    const id = crypto.randomUUID();
    const message = '';

    return {
        id, message
    };
}

function renderView(tweetView: TweetView) {
    let view = document.querySelector(`#container-${tweetView.id}`);
    if (view) {
        view.innerHTML = "";
    } else {
        view = document.createElement("div");
        view.id = `container-${tweetView.id}`;
        view.classList.add("mainContainer");
        document.querySelector(".tweets")?.append(view);
    }

    for (let i = 0; i < tweetView.tweets.length; i++) {
        let flag: boolean = i === tweetView.tweets.length-1 ; 
        renderTweet(tweetView, view as HTMLDivElement,  tweetView.tweets[i],flag); 
    }
}

function renderTweet(tweetView: TweetView, view: HTMLDivElement, tweet: Tweet, last: boolean) {
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
    })
    textArea.addEventListener("input", (e) => {
        const value = (e.target as HTMLTextAreaElement).value;
        updateTweet(tweetView, tweet, value);
    })
    form.append(textArea);
    if (last) {
        form.appendChild(buttonAddMore);
    }
    view.append(tweetContainer);
}

function updateTweet(tweetView: TweetView, tweet: Tweet, value: Message) {
    let ref: Tweet | null = null;
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

const btnNewTweet = document.querySelector(".btnNewTweet")!;
const containerTweet = document.querySelector(".tweets"); 
const tweetsData: TweetView[] = []; 

btnNewTweet.addEventListener("click", (e) =>{
    e.preventDefault(); 
    const newTweetView = createMainTweet(); 
    renderView(newTweetView); 
})