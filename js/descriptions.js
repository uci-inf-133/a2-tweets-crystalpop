let written_tweets = [];
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	written_tweets = tweet_array.filter(twt => {return twt.written === true});
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById("textFilter").addEventListener("input", function () {
		const prompt = document.getElementById("textFilter").value.toLowerCase();
		const table = document.getElementById("tweetTable");
		const search_count = document.getElementById("searchCount");
		document.getElementById("searchText").textContent = prompt;

		let filtered_tweets = []

		if (prompt) {
			filtered_tweets = written_tweets.filter(twt => twt.writtenText.toLowerCase().includes(prompt));
		}

		table.innerHTML = "";

		search_count.textContent = filtered_tweets.length;

		filtered_tweets.forEach((twt, i) => {
			let new_row = document.createElement("tr");
			new_row.innerHTML = twt.getHTMLTableRow(i + 1);
			table.appendChild(new_row);
		});
	})
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});