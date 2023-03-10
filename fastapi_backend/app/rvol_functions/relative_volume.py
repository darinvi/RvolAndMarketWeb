import datetime,pytz
from app.clients import finnhubClient


def RelativeVolumeMain(symbol):
    candles = getVolumeAndTime(symbol)
    candles = mapUnixToDate(candles)
    candles = getRegularTradingSession(candles)
    return calculateRelativeVolume(candles)
    
def getVolumeAndTime(symbol):
    #only returns volume and time for the purposes of this program
    data = finnhubClient(symbol)
    try:
        filtered = [element for element in list(map(list,zip(list(data['v']),list(data['t']))))]
        return filtered
    except KeyError:
        return ''

def unixToNyDate(lst_element):
    #finnhub returns unix, much easier to filter based on hour and minute.
    ny_timezone = pytz.timezone('America/New_York')
    unix_to_datetime = datetime.datetime.utcfromtimestamp(lst_element[1]).replace(tzinfo=pytz.utc)
    as_date = unix_to_datetime.astimezone(ny_timezone)
    lst_element[1] = as_date
    return lst_element

def mapUnixToDate(lst):
    lst = list(map(unixToNyDate,lst))
    return lst

def getRegularTradingSession(lst):
    #this one fillters data for the whole trading session.
    regular_session = [rs for rs in lst if \
        (rs[1].hour==9 and rs[1].minute>29) or rs[1].hour in range(10,16)]
    #this one fillters it up to the current moment.
    current_time = [ct for ct in regular_session if \
        ct[1].hour<lst[-1][1].hour or (ct[1].hour==lst[-1][1].hour and ct[1].minute<=lst[-1][1].minute)]
    return current_time

def separateData(lst):
    #separate today's data from data for the past days so I can compare. Only returns closes
    rolling_days = list(dict.fromkeys([days[1].day for days in lst]))[-21:-1]
    past_closes = [item[0] for item in lst if item[1].day in rolling_days]
    today_closes = [item[0] for item in lst if item[1].day==lst[-1][1].day]
    return past_closes,today_closes

def calculateAverageVolume(lst):
    try:
        avg_vol = sum(lst)/len(lst)
        return avg_vol
    except ZeroDivisionError:
        return ''

def calculateRelativeVolume(lst):
    past,today = separateData(lst)
    past_avg = calculateAverageVolume(past)
    today_avg = calculateAverageVolume(today)
    try:
        rvol = today_avg/past_avg
        return rvol
    except TypeError:
        return ''
