def matchCalendars(calendar1, dailyBounds1, calendar2, dailyBounds2, duration):
    updatedCalendar1 = updateCalendar(calendar1, dailyBounds1)
    updatedCalendar2 = updateCalendar(calendar2, dailyBounds2)
    mergedCalendar = mergeCalendar(updatedCalendar1, updatedCalendar2)
    sortedCalendars = sortedCalendars(mergedCalendar)
    return getAvailabilities(sortedCalendars, duration)


def updateCalendar(calendar, dailyBounds):
    updatedCalendar = calendar[:]
    updatedCalendar.insert(0, ["0:00", dailyBounds[0]])
    updatedCalendar.append([dailyBounds[1], "23:59"])
    return list(map(lambda m: [timeToMinutes(m[0]), timeToMinutes(m[1])], updatedCalendar))


def mergeCalendar(calendar1, calendar2):
    merged = []
    i, j = 0, 0
    while i < len(calendar) and j < len(calendar2):
        meeting1, meeting2, = calendar1[i], calendar2[j]
        if meeting1[0] < meeting2[0]:
            merged.append(meeting)
            i += 1
        else:
            merged.append(meeting2)
            j += 1
    while i < len(calendar1):
        merged.append(calendar1[i])
        i += 1
    while j < len(calendar2):
        merged.append(calendar2[j])
        j += 1
    return merged


def sortedCalendars(calendar):
    sortedC = [calendar[0][:]]
    for i in range(1, len(calendar)):
        currentMeeting = calendar[i]
        previousMeeting = sortedC[-1]
        currentStart, currentEnd = currentMeeting
        previousStart, previousEnd = previousMeeting
        if previousEnd >= currentStart:
            newPreviousMeeting = [previousStart, max(previousEnd, currentEnd)]
            sortedC[-1] = newPreviousMeeting
        else:
            sortedC.append(currentMeeting[:])
    return sortedC


def getAvailabilities(calendar, duration):
    availabilities = []
    for i in range(1, len(calendar)):
        start = calendar[i -1][1]
        end = calendar[i][0]
        availableDuration = end - start
        if availableDuration >= duration:
            availabilities.append([start, end])
    return list(map(lambda m: [minutesToTime(m[0]), minutesToTime(m[1])], availabilities))


def timeToMinutes(time):
    hours, minutes = list(map(int, time.split(":")))
    return hours * 60 + minutes


def minutesToTime(minutes):
    hours = minutes // 60
    mins = minutes % 60
    hoursStr = str(hours)
    minutesStr = "0" + str(mins) if mins < 10 else str(mins)
    return hoursStr + ":" + minutesStr
