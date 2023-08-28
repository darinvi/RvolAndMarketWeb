from app.rvol_functions.data_preparation import historicalDataFrame

def secondDay(df, direction):
    all_unusual_days = df[df['Unusual_action']==direction]
    unusual_days_continuation = all_unusual_days[all_unusual_days['D2']==direction]
    return {
        'all': len(all_unusual_days),
        'passing': len(unusual_days_continuation),
        'percentage': f'{len(unusual_days_continuation)/len(all_unusual_days)*100:.0f}%'
    }


def freshGap(df, direction):
    all_gaps = df[df['Gap'] > 3] if direction == 1 else df[df['Gap'] < -3]
    held_gaps = all_gaps[all_gaps['Held_open'] == direction]
    return {
        'all': len(all_gaps),
        'passing': len(held_gaps),
        'percentage': f'{len(held_gaps)/len(all_gaps)*100:.0f}%'
    }


def handleChosenStrategy(strategy, symbol):
    df = historicalDataFrame(symbol)
    direction = 1 if 'green' in strategy or 'up' in strategy else -1

    map_strategy = {
        'Second day- green': secondDay,
        'Second day- red': secondDay,
        'Fresh gap- up': freshGap,
        'Fresh gap- down': freshGap,
    }

    return map_strategy[strategy](df, direction)