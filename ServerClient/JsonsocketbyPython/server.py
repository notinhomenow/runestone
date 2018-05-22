#file:server.py
from jsonsocket import Server

host = '192.168.124.1'
port = 8080

server = Server(host, port)
data = {
		'action': 'down',
		'move': 'forward'
	}
	
while True:
	server.accept()
	rec = server.recv()
	print "server", rec
	server.send(data)

server.close()