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
	console.log(written_tweets);
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById("textFilter").addEventListener("input", function () {
		let prompt = document.getElementById("textFilter").value.trim().toLowerCase();
		document.getElementById("tweetTable").innerHTML = "";
		// if (!prompt) {
		// 	document.getElementById("searchCount").textContent = "0";
		// 	document.getElementById("searchText").textContent = "";
		// 	return;
		// }
		let filtered_tweets = []
		if (prompt) {
		filtered_tweets = written_tweets.filter(twt => twt.writtenText.toLowerCase().includes(prompt));
		console.log(filtered_tweets);
		}

		document.getElementById("tweetTable").innerHTML = "";

		filtered_tweets.forEach((twt, i) => {
			document.getElementById("tweetTable").innerHTML += twt.getHTMLTableRow(i + 1);
		});

		document.getElementById("searchCount").textContent = filtered_tweets.length.toString();
		document.getElementById("searchText").textContent = prompt;
	})

	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});