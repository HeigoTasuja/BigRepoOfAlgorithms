fn main() {
    // Example usage
}

fn match_calendars(calendar1: Vec<Vec<&str>>, daily_bounds1: Vec<&str>, calendar2: Vec<Vec<&str>>, daily_bounds2: Vec<&str>, duration: i32) -> Vec<Vec<String>> {
    let updated_calendar1 = update_calendar(calendar1, daily_bounds1);
    let updated_calendar2 = update_calendar(calendar2, daily_bounds2);
    let merged_calendar = merge_calendar(updated_calendar1, updated_calendar2);
    let sorted_calendars = sort_calendars(merged_calendar);
    get_availabilities(sorted_calendars, duration)
}

fn update_calendar(calendar: Vec<Vec<&str>>, daily_bounds: Vec<&str>) -> Vec<Vec<i32>> {
    let mut updated = vec![vec!["0:00", daily_bounds[0]]];
    updated.extend_from_slice(&calendar);
    updated.push(vec![daily_bounds[1], "23:59"]);
    updated.iter().map(|m| vec![time_to_minutes(m[0]), time_to_minutes(m[1])]).collect()
}

fn merge_calendar(mut calendar1: Vec<Vec<i32>>, mut calendar2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut merged: Vec<Vec<i32>> = Vec::new();
    while !calendar1.is_empty() && !calendar2.is_empty() {
        let meeting1 = calendar1[0].clone();
        let meeting2 = calendar2[0].clone();
        if meeting1[0] < meeting2[0] {
            merged.push(meeting1);
            calendar1.remove(0);
        } else {
            merged.push(meeting2);
            calendar2.remove(0);
        }
    }
    merged.extend(&calendar1);
    merged.extend(&calendar2);
    merged
}

fn sort_calendars(calendar: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut sorted = vec![calendar[0].clone()];
    for current in &calendar[1..] {
        let mut previous = sorted.last_mut().unwrap();
        if previous[1] >= current[0] {
            previous[1] = std::cmp::max(previous[1], current[1]);
        } else {
            sorted.push(current.clone());
        }
    }
    sorted
}

fn get_availabilities(calendar: Vec<Vec<i32>>, duration: i32) -> Vec<Vec<String>> {
    let mut availabilities: Vec<Vec<String>> = Vec::new();
    for i in 1..calendar.len() {
        let start = calendar[i - 1][1];
        let end = calendar[i][0];
        if end - start >= duration {
            availabilities.push(vec![minutes_to_time(start), minutes_to_time(end)]);
        }
    }
    availabilities
}

fn time_to_minutes(time: &str) -> i32 {
    let parts: Vec<&str> = time.split(':').collect();
    let hours: i32 = parts[0].parse().unwrap();
    let minutes: i32 = parts[1].parse().unwrap();
    hours * 60 + minutes
}

fn minutes_to_time(minutes: i32) -> String {
    let hours = minutes / 60;
    let mins = minutes % 60;
    format!("{}:{:02}", hours, mins)
}
