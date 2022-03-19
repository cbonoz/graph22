import logging
from http.client import HTTPException

from fastapi import HTTPException


def bad_request(message):
    raise HTTPException(status_code=400, detail=message)

def check_keys_in_object(keys, obj):
    missing_keys = list(filter(lambda k: k not in obj, keys))
    if len(missing_keys) > 0:
        err = "Validation Failed: {} not present in object".format(','.join(missing_keys))
        logging.error(err)
        bad_request(err)
