function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	console.log(tweet_array);

	let graph_data = [];

	for (twt of tweet_array) {
		graph_data.push({"activity": twt.activityType, "distance": twt.distance, "day":twt.time.getDay()})
	}
	console.log(graph_data);

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

	
	const activity_graph = activity_entries.map(([activity, values]) => ({activity, frequency: values[0], distance: values[1]}));
	activity_graph.sort((a, b) => b.frequency - a.frequency);
	console.log(activity_graph);

	const filtered_top_three = graph_data.filter(d => (d.activity == activity_entries[0][0]) || (d.activity == activity_entries[1][0]) || (d.activity==activity_entries[2][0]));
	// console.log(filtered_data);
	
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activity_graph
	  },
	  "mark": {"type": "bar", "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3},
	  "encoding": {
		"x": {
			"field": "activity",
			"type": "nominal",
			"title": "Activity"
		},
		"y": {
			"field": "frequency",
			"type": "quantitative",
			"title": "Frequency"
		},
		"tooltip": [
			{"field": "activity", "title": "Activity"},
			{"field": "frequency", "title": "Frequency"}
		]
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for the three most popular activities.",
		"data":  {
			"values": filtered_top_three
		},
		"mark": {"type": "point", "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3 },
		"encoding": {
			"x": {"field": "day", "type": "ordinal", "title": "Day of the week",
				"sort": [0,1,2,3,4,5,6],
				"axis": {
					labelExpr: "['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][datum.value]"
				}
			},
			"y": {"field": "distance", "type": "quantitative", "title": "Distance"},
			"color": {"field": "activity", "title": "Activity"},
			"tooltip": [
				{"field": "activity"},
				{"field": "day"},
				{"field": "distance"}
			]
		}
	};

	vegaEmbed('#distanceVis', distance_vis_spec, {actions: false});

	dist_agg_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the mean distances by day of the week for the most popular activities.",
		"data": {"values": filtered_top_three},
		"mark": {"type": "point", "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3 },
		"encoding": {
			"x": {
				"field": "day", "type": "ordinal", "title": "Day of the week",
				"sort": [0,1,2,3,4,5,6],
				"axis": {
					labelExpr: "['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][datum.value]"
				} 
			},
			"y": {
				"aggregate": "mean",
				"field": "distance",
				"type": "quantitative",
				"title": "Mean Distance"
			},
		"color": { "field": "activity", "type": "nominal", "title": "Activity" },
        "tooltip": [
            { "field": "activity" },
            { "field": "day" },
            { "aggregate": "mean", "field": "distance", "title": "Mean Distance" }
          ]
		}
	};

	document.getElementById("longestActivityType").innerText = "bike";
	document.getElementById("shortestActivityType").innerText = "walk";
	document.getElementById("weekdayOrWeekendLonger").innerText = "weekends";

	let show_agg = false;

      document.getElementById("aggregate").addEventListener("click", () => {
		console.log("CLICKED");
        show_agg = !show_agg;
        document.getElementById("aggregate").textContent = show_agg ? "Show all activities" : "Show means";
        let spec = show_agg ? dist_agg_vis_spec : distance_vis_spec;
        vegaEmbed("#distanceVis", spec, { actions: false });
      });

	

// 	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
// 	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});