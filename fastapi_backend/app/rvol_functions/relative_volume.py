import datetime,pytz
from app.clients import finnhubClient, yahooClient
import pandas as pd

# Chain all the required functions
def RelativeVolumeMain(symbol):
    df = pd.DataFrame(finnhubClient(symbol))
    df = unixToNyDate(df)
    df_today, df_past = separateData(df)
    return calculateRelativeVolume(df_today, df_past)


# I am using NY time as this is focused on the New York Stock Exchange
# Not using unix and converting to datetime for easier filtering later
def unixToNyDate(df):
    df['datetime'] = pd.to_datetime(df['t'], unit='s')
    ny_timezone = pytz.timezone('America/New_York')
    df['datetime'] = df['datetime'].dt.tz_localize(pytz.utc).dt.tz_convert(ny_timezone)
    return df[['datetime','v']]


# Separating the dataframe into one that contains todays data and one containing data for ~20 days in the past.
def separateData(data):
    day_today = data['datetime'].tail(1)
    df_today = data[(data['datetime'].dt.day == int(day_today.dt.day)) & (data['datetime'].dt.month == int(day_today.dt.month))]
    df_past = data[(data['datetime'].dt.day != int(day_today.dt.day)) | (data['datetime'].dt.month != int(day_today.dt.month))]
    return df_today, df_past


# Calculate the average volume done until the current time of day. 
# If todays dataframe passes will return the accumulated volume for this moment.
def getCurrentTimeAverageVolume(data):
    time_now = datetime.datetime.now(pytz.timezone('America/New_York'))
    df = data[
        (data['datetime'].dt.hour < time_now.hour) | 
        ((data['datetime'].dt.hour == time_now.hour) & (data['datetime'].dt.minute <= time_now.minute))
    ]
    return df['v'].sum() / getDateLength(data)


# Relative Volume is the volume accumulated to this moment today divided by the volume accumulated for the same period in an average day
def calculateRelativeVolume(df_today, df_past):
    volume_today = getCurrentTimeAverageVolume(df_today)
    average_volume = getCurrentTimeAverageVolume(df_past)
    return volume_today/average_volume


# Returns the number of different trading sessions in the dataframe. 1 if todays df passed
def getDateLength(data):
    dates = list(map(lambda x: pd.to_datetime(x, unit='ns'), data['datetime'].values.tolist()))
    unique_dates = set(map(lambda x: f'{x.year}-{x.month}-{x.day}', dates))
    return len(unique_dates)