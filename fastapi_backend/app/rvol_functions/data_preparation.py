import pandas as pd
from app.clients import yahooClient

def historicalDataFrame(symbol):
    df = yahooClient(symbol)
    df = addRelativeVolume(df)
    df = addAverageTrueRange(df)
    df = addRelativeRange(df)
    # using rolling window 20 so I prefer to clean the first entries that haven't cought up.
    df = df[20:]
    return df

def addRelativeVolume(df):
    #a coefficient showing how much volume is done today relative to the average daily volume.
    df['Rvol'] = df['Volume']/df['Volume'].rolling(20,1).mean()
    return df

def addAverageTrueRange(df):
    # m1,m2,m3- different methods, highest abs value is the valid daily true range
    true_range = pd.DataFrame([])
    true_range['m1'] = df['High']-df['Low']
    true_range ['m2'] = abs(df['High']-df['Close'].shift(1))
    true_range['m3'] = abs(df['Low']-df['Close'].shift(1))
    df['TR'] = true_range[['m1', 'm2', 'm3']].max(axis=1)
    df['ATR'] = df["TR"].rolling(20,0,).mean()
    return df

def addRelativeRange(df):
    #Standardize true ranges throughout the years
    df["RR"] = df["TR"]/df["ATR"]
    return df
