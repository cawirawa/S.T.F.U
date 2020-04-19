from base64 import b32encode
from hashlib import sha1
from random import random


def pkgen():
    first = b32encode(sha1(str(random())).digest()).lower()[:3]
    second = b32encode(sha1(str(random())).digest()).lower()[:4]
    pk = first + '-' + second
    return pk