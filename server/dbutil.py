from curses.panel import bottom_panel
from datetime import datetime
import os
import pyTigerGraph as tg
import json


TIGER_PW = os.getenv('TIGER_PW')
TIGER_HOST = os.getenv('TIGER_HOST', '001150f0ce4e4c6980f2c7c1669a26f4.i.tgcloud.io')
TIGER_USER = os.getenv('TIGER_USER', 'tigergraph')
TIGER_TOKEN = os.getenv('TIGER_TOKEN')
print('params', TIGER_HOST, TIGER_PW, TIGER_USER, TIGER_TOKEN)
conn = tg.TigerGraphConnection(host=TIGER_HOST, graphname="propgraph", username=TIGER_USER, password=TIGER_PW, apiToken=TIGER_TOKEN)

secret = conn.createSecret()
print(secret)
conn.getToken(secret=secret)
print('fetched token', conn.apiToken[:4] + "**")

# https://github.com/pyTigerGraph/pyTigerGraph/blob/master/examples/GSQL101%20-%20PyTigerGraph.ipynb


def mark_comparable(mls1, mls2):
    comparables = [(mls1, mls2, {'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")})]
    print('mark comparable', comparables)
    conn.upsertEdges(
        sourceVertexType='property', 
        edgeType='comparable', 
        targetVertexType='property', 
        edges=comparables)


def get_properties(bottom_left, top_right, match_field=None, match_value=None):
    # top_left: {lat,lng}
    # bottom_right: {lat, lng}
    query = 'select * from property' 
    bound_query = None
    if top_right and bottom_left:
        # TODO: fix bounds.
        bound_query = f"lat >= {bottom_left['lat']} and lat <= {top_right['lat']} and lng >= {bottom_left['lng']} and lng <= {top_right['lng']}"

    if match_field and match_value:
        query += f" where {match_field}=={match_value}"
        if bound_query:
            query += f" and {bound_query}"
    elif bound_query:
        query += f" where {bound_query}"
    query += " limit 100"

    props = json.loads(conn.gsql(query))
    print('query', query, props)
    results = [{'mls_id': p['v_id'], **p['attributes']} for p in props]
    return results


def insert_properties(properties):
    values = []
    for p in properties:
        mls_id = p.pop('mls_id')
        values.append((mls_id, p))
    print('insert', values)
    return conn.upsertVertices(vertexType='property', vertices=values)
    

def convert_to_schema(redfin_rows):
    return [{
        'mls_id': row.get('MLS#'),
        'address': row['ADDRESS'],
        'city': row['CITY'],
        'state': row['STATE OR PROVINCE'],
        'zip': row['ZIP OR POSTAL CODE'],
        'price': float(row['PRICE']),
        'lat': float(row['LATITUDE']),
        'lng': float(row['LONGITUDE']),
        'beds': float(row['BEDS']),
        'baths': float(row['BATHS']),
        'sqft': float(row['SQUARE FEET']),
        'type': row['PROPERTY TYPE'],
        'url': row.get('URL (SEE https://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)')
    } for row in redfin_rows if (row.get('MLS#') and row.get('BEDS') and row.get('BATHS'))]