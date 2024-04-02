import socket

HOST = 'localhost'
PORT = 8001

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((HOST, PORT))
sock.listen(1)

conn, addr = sock.accept()
with conn:
    data = conn.recv(1024)
    if not data is None:
        print(data.decode())
        conn.sendall(b"Hello from server")
