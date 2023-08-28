import pandas as pd
import numpy as np
from app.clients import yahooClient


def historicalDataFrame(symbol):
    df = yahooClient(symbol)
    df = addRelativeVolume(df)
    df = addAverageTrueRange(df)
    df = addRelativeRange(df)
    df = addGap(df)
    df = addCloseAtExtremeBoolean(df)
    df = addUnusualTradingAction(df)
    df = addSecondDayContinuation(df)
    df = addHeldOpen(df)
    # using rolling window 20 so I prefer to clean the first entries that haven't cought up.
    df = df[20:]
    return df


#a coefficient showing how much volume is done today relative to the average daily volume.
def addRelativeVolume(df):
    df['Rvol'] = df['Volume']/df['Volume'].rolling(20,1).mean()
    return df


# m1,m2,m3- different methods, highest abs value is the valid daily true range
def addAverageTrueRange(df):
    true_range = pd.DataFrame([])
    true_range['m1'] = df['High']-df['Low']
    true_range ['m2'] = abs(df['High']-df['Close'].shift(1))
    true_range['m3'] = abs(df['Low']-df['Close'].shift(1))
    df['TR'] = true_range[['m1', 'm2', 'm3']].max(axis=1)
    df['ATR'] = df["TR"].rolling(20,0,).mean()
    return df


#Standardize true ranges throughout the years by comparing them to the average true range. 
def addRelativeRange(df):
    df["RR"] = df["TR"]/df["ATR"]
    return df


def addGap(df):
    df['Gap'] = (df['Open'] - df['Close'].shift(1)) / df['Close'].shift(1) * 100
    return df


def addCloseAtExtremeBoolean(df):
    conditions = [
        ((df['High'] - df['Close']) / (df['High'] - df['Low']) <= 0.2),
        ((df['Close'] - df['Low']) / (df['High'] - df['Low']) <= 0.2)
    ]
    values = [1, -1]
    df['Close_Extreme'] = np.select(conditions, values, 0)
    return df


# Only checking whether the stock is passing the criteria for unusual trading action in a given day.
def addUnusualTradingAction(df):
    conditions = [
        ((df['Close'] > df['Open']) & (df['Rvol'] > 1.5) & (df['Close_Extreme'] == 1)),
        ((df['Close'] < df['Open']) & (df['Rvol'] > 1.5) & (df['Close_Extreme'] == -1))
    ]
    values = [1, -1]
    df['Unusual_action'] = np.select(conditions, values, 0)
    return df


def addSecondDayContinuation(df):
    conditions = [
        ((df['Unusual_action']==1) & (df['Close'].shift(-1) > df['Close'])),
        ((df['Unusual_action']==-1) & (df['Close'].shift(-1) < df['Close']))
    ]
    values = [1, -1]
    df['D2'] = np.select(conditions, values, 0)
    return df


def addHeldOpen(df):
    conditions = [
        ((df['Gap'] > 0) & (df['Close'] > df['Open'])),
        ((df['Gap'] < 0) & (df['Close'] < df['Open']))
    ]
    values = [1, -1]
    df['Held_open'] = np.select(conditions, values, 0)
    return df