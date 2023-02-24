from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rvol_functions.relative_volume import RelativeVolumeMain
from app.rvol_functions.data_preparation import historicalDataFrame

class Ticker(BaseModel):
    ticker: str

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post('/rvol')
async def calculate_rvol(ticker:Ticker):
    rvol = RelativeVolumeMain(ticker.ticker.upper())
    df = historicalDataFrame(ticker.ticker.upper())
    if type(rvol) == float:
        return  {
            'rvol':f'{rvol:.2f}',
            'atr':f"{df['ATR'][-1]:.2f}"
    }
    else:
        return ''