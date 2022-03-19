import os
import pyTigerGraph as tg
from soupsieve import match


TIGER_PW = os.getenv('TIGER_PW')
TIGER_HOST = os.getenv('TIGER_HOST', '001150f0ce4e4c6980f2c7c1669a26f4.i.tgcloud.io')
TIGER_USER = os.getenv('TIGER_USER', 'tigergraph')
TIGER_TOKEN = os.getenv('TIGER_TOKEN')
print('params', TIGER_HOST, TIGER_PW, TIGER_USER, TIGER_TOKEN)

conn = tg.TigerGraphConnection(host=TIGER_HOST, graphname="graphre", username=TIGER_USER, password=TIGER_PW, apiToken=TIGER_TOKEN)


def mark_comparable(mls1, mls2):
    comparables = [(mls1, mls2, {'created_at': None})]
    conn.upsertEdges(
        sourceVertexType='property', 
        edgeType='comparable', 
        targetVertexType='property', 
        edges=comparables)


def get_properties(top_left, bottom_right, match_field=None, match_value=None):
    # top_left: {lat,lng}
    # bottom_right: {lat, lng}
    query = 'select * from properties' # TODO: add bounds.
    if match_field and match_value:
        query = f"{query} where {match_field}=={match_value}"

    props = conn.gsql(query)
    return [p['attributes'] for p in props]


def insert_properties(properties):
    values = [(p['mls_id'], p) for p in properties]
    print('insert', values)
    return conn.upsertVertices(vertexType='property', vertices=values)
    

def convert_to_schema(redfin_rows):
    return [{
        'mls_id': row['MLS#'],
        'address': row['ADDRESS'],
        'city': row['CITY'],
        'state': row['STATE'],
        'zip': row['ZIP OR POSTAL CODE'],
        'price': row['PRICE'],
        'lat': row['LATITUDE'],
        'lng': row['LONGITUDE'],
        'beds': row['BEDS'],
        'baths': row['BATHS'],
        'sqft': row['SQUARE FEET'],
        'type': row['PROPERTY TYPE']
    } for row in redfin_rows]