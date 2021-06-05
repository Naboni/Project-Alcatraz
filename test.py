import requests

BASE = "http://1270.0.1:5000/"

respose = requests.post(BASE + "auth/register", {"username":"naboni", "password":"123456", "email":"email"})

print(respose.json())
input()
