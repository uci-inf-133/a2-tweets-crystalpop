class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.startsWith("Just completed") || this.text.startsWith("Just posted")) {return "completed_event";}
        else if (this.text.startsWith("Achieved")) {return "achievement";}
        else if (this.text.startsWith("Watch")) {return "live_event"}
        else {return "miscellaneous";}
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes(" - ")) {
            return true;
        };
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let splitted = this.text.split(" ");
        if (!parseFloat(splitted[3])) {
            return splitted[3];
        }
        return splitted[5];
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        let splitted = this.text.split(" ");
        let dist = parseFloat(splitted[3]);
        if (!dist) {return 0;}
        if (splitted[4] == "km") {
            dist = dist / 1.609;
        }
        return dist;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}