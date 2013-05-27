function prettyDate(now, time){
        var date = new Date(time || ""),
            diff = (((new Date(now)).getTime() - date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400);
        if ( isNaN(day_diff) || day_diff < 0 )
        return;
        if (day_diff <31) {
            return days(day_diff);
        } else if (day_diff<365) {
            var months=Math.floor(day_diff/31);
            var day_diff2=day_diff-months*31;
            return months+' months, '+days(day_diff2);
        } else {
            var years=Math.floor(day_diff/365);
            var months=Math.floor((day_diff-years*365)/31);
            var weeks=Math.floor((day_diff-years*365-months*31)/7);
            var day_diff2=(day_diff-years*365-months*31);
            return years+' years, '+months+' months and '+days(day_diff2);
        }
        function days(day_diff) {
            return day_diff == 0 && (
                diff < 60 && "just now" ||
                diff < 120 && "1 minute ago" ||
                diff < 3600 && Math.floor( diff / 60 ) +
                " minutes ago" ||
                diff < 7200 && "1 hour ago" ||
                diff < 86400 && Math.floor( diff / 3600 ) +
                " hours ago") ||
                day_diff == 1 && "1 day ago" ||
                day_diff < 31 && day_diff + " days ago";
        }
}

