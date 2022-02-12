import os
import pyTigerGraph as tg


TIGER_PW = os.getenv('TIGER_PW')
TIGER_HOST = os.getenv('TIGER_HOST', 'https://1de47c4efcee4a26bb45810f7284504a.i.tgcloud.io')
TIGER_USER = os.getenv('TIGER_USER')
TIGER_TOKEN = os.getenv('TIGER_TOKEN')

conn = tg.TigerGraphConnection(
    host=TIGER_HOST,
    graphname='graphre', 
    password=TIGER_PW, 
    clientVersion="3.5.0")

conn = tg.TigerGraphConnection(host=TIGER_HOST, graphname="graphre", username=TIGER_USER, password=TIGER_PW, apiToken=TIGER_TOKEN)



