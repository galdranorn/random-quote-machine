// links to tweeter + quote
const tweetLink = "https://twitter.com/intent/tweet?text=";
const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// links to html
const randomQuoteBtn = document.querySelector("#randomQuote");
const twitterBtn = document.querySelector("#tweetBtn");

// event listeners after DOM content is loaded

document.addEventListener('DOMContentLoaded', function() {
    // first quote on place
    getQuote();
    // random quote button
    randomQuoteBtn.addEventListener('click', function() {
        getQuote();
    });
    // twitter button
    twitterBtn.addEventListener("click", function (){
        createTweet();
    });
});

// getting quote
function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

// creating tweet
function createTweet(input) {
    let data = input[0];
    // create div element with got content
    let dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    // change content to text because it's <p> element
    let quoteText = dataElement.innerText.trim();
    let quoteAuthor = data.title;

    // if there is no author = write 'unknown author'
    if (!quoteAuthor.length) {quoteAuthor = "Unknown author";}

    // how the tweet will look like
    let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    // if quote is longer than 140 signs - find another quote
    if (tweetText.length > 140) {
        getQuote();
    } 
    // if quote is shorter than 140 signs - create the tweet
    else {
        let tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('#tweet').setAttribute('href', tweet);
    }
    document.querySelector('#tweet').setAttribute('href', tweet);
}