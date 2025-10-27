function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	let activity_types = {};
	for (twt of tweet_array) {
		if (twt.activityType != "unknown") {
			if (!(twt.activityType in activity_types)) {
				activity_types[twt.activityType] = [1, twt.distance];
			}
			else {
				activity_types[twt.activityType][0] += 1;
				activity_types[twt.activityType][1] += twt.distance;
			}
		}
	}

	let activity_entries = Object.entries(activity_types);

	console.log(activity_types);
	document.getElementById("numberActivities").innerText = Object.keys(activity_types).length;

	activity_entries.sort((a, b) => b[1][0] - a[1][0]);
	document.getElementById("firstMost").innerText = activity_entries[0][0];
	document.getElementById("secondMost").innerText = activity_entries[1][0];
	document.getElementById("thirdMost").innerText = activity_entries[2][0];


	console.log(activity_entries);
	let longest = activity_entries[0];
	let shortest = activity_entries[2];
	for (let i = 0; i<3; i++) {
		if (activity_entries[i][1][1] > longest[1][1]) {
			longest = activity_entries[i];
		}
		if (activity_entries[i][1][1] < shortest[1][1]) {
			shortest = activity_entries[i];
		}
	}
	document.getElementById("longestActivityType").innerText = longest[0];
	document.getElementById("shortestActivityType").innerText = shortest[0];
	

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

// 	activity_vis_spec = {
// 	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
// 	  "description": "A graph of the number of Tweets containing each type of activity.",
// 	  "data": {
// 	    "values": tweet_array
// 	  }
// 	  //TODO: Add mark and encoding
// 	};
// 	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

// 	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
// 	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});