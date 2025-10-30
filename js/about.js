function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString("en-US", options);
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length-1].time.toLocaleDateString("en-US", options);


	//Categories
	completed_sum = 0;
	live_sum = 0;
	achieve_sum = 0;
	misc_sum = 0;
	written_sum = 0
	// go by if it has a dash - then it's user written
	for (const twt of tweet_array) {
		if (twt.written) {written_sum += 1;}
		if (twt.source == "completed_event") {completed_sum += 1;}
		else if (twt.source == "live_event") {live_sum += 1;}
		else if (twt.source == "achievement") {achieve_sum += 1;}
		else {misc_sum += 1;
			// console.log(twt.text);
		}
	}


	document.getElementsByClassName("completedEvents")[0].innerText = completed_sum;
	document.getElementsByClassName("completedEvents")[1].innerText = completed_sum;
	document.getElementsByClassName("completedEventsPct")[0].innerText = math.format((completed_sum/tweet_array.length)*100, {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName("liveEvents")[0].innerText = live_sum;
	document.getElementsByClassName("liveEventsPct")[0].innerText = math.format((live_sum/tweet_array.length)*100, {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName("achievements")[0].innerText = achieve_sum;
	document.getElementsByClassName("achievementsPct")[0].innerText = math.format((achieve_sum/tweet_array.length)*100, {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName("miscellaneous")[0].innerText = misc_sum;
	document.getElementsByClassName("miscellaneousPct")[0].innerText = math.format((misc_sum/tweet_array.length)*100, {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName("written")[0].innerText = written_sum;
	document.getElementsByClassName("writtenPct")[0].innerText = math.format((written_sum/tweet_array.length)*100, {notation: 'fixed', precision: 2}) + "%";




}	


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});