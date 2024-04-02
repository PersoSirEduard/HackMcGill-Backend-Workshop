import socket

HOST = 'localhost'
PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

sock.send(b"Hello from client")
res = sock.recv(1024)
print(res.decode())
