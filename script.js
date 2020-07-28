const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading 
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
const proxyUrl = 'https://secret-ocean-38471.herokuapp.com/'

async function getQuote(){

    //Loader runs first before show the quote
    loading();

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

       // if Author is blink, add "unknown"
        if(data.quoteAuthor === ''){
            authorText.innerText = "Unknown";
        }else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        // Stop Loader, Show Quote
        complete();

    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}
// Tweet Quote
    const tweetQuote = () =>{
        const quote = quoteText.innerText;
        const author = authorText.innerText; 
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
}

// Event Listeners 
    newQuoteBtn.addEventListener('click', getQuote);
    twitterBtn.addEventListener('click', tweetQuote)

// On Load
    getQuote();
   



