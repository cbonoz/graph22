from fastapi import FastAPI
from server.dbutil import convert_to_schema, get_properties, insert_properties, mark_comparable

from util import check_keys_in_object
from dbutil import db_conn

app = FastAPI()


@app.get("/")
def hello():
    return {"Hello": "World"}


@app.post("/upload")
def upload_properties(data):
    check_keys_in_object(['properties'], data)
    props = convert_to_schema(data['properties'])
    return insert_properties(properties=props)

@app.post("/mark-comparable")
def mark_comparable(data):
    check_keys_in_object(['id1', 'id2'], data)
    print('mark', data)
    # db_conn.up
    return mark_comparable(data['id1'], data['id2'])

@app.post("/fetch")
def fetch_properties(data):
    print('fetch', data)
    check_keys_in_object(['top_left', 'bottom_right'], data)
    matches = get_properties(data['top_left'], data['bottom_right'])
    return matches


@app.post("/predict")
def predict(data):
    print('predict', data) 
    check_keys_in_object(['address'], data)
    return {}