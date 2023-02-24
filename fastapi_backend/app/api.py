from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.relative_volume import RelativeVolumeMain

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

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/stonks")
async def reverse_word(word):
    return word[::-1]

@app.post('/rvol')
async def calculate_rvol(ticker:Ticker):
    rvol = RelativeVolumeMain(ticker.ticker.upper())
    if type(rvol) == float:
        return  f'{rvol:.2f}'
    else:
        return ''