#file:client.py
from jsonsocket import Client
import time

host = '192.168.124.1'
port = 8080

data ={
	'temperature': 'good',
	'humidity' : 'acceptable',
	'drop-off' : 'fix'
	}

while True:
	client = Client()
	client.connect(host, port).send(data)
	response = client.recv()
	print "client", response
	client.close()
	time.sleep(1)