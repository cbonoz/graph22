from fastapi import FastAPI
from dbutil import convert_to_schema, get_properties, insert_properties, mark_comparable

from util import check_keys_in_object
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello():
    return {"Hello": "World"}


@app.post("/upload")
def upload_properties(data: dict):
    check_keys_in_object(['properties'], data)
    props = convert_to_schema(data['properties'])
    return insert_properties(properties=props)

@app.post("/mark-comparable")
def post_comparable(data: dict):
    check_keys_in_object(['id1', 'id2'], data)
    return mark_comparable(data['id1'], data['id2'])

@app.post("/fetch")
def fetch_properties(data:dict):
    print('fetch', data)
    check_keys_in_object(['bottom_left', 'top_right'], data)
    matches = get_properties(data['bottom_left'], data['top_right'], data.get('match_field'), data.get('match_value'))
    return matches


@app.post("/predict")
def predict(data: dict):
    print('predict', data) 
    check_keys_in_object(['address'], data)
    return {}