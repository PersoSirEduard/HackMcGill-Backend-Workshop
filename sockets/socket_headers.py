import socket

HOST = 'localhost'
PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((HOST, PORT))
sock.listen(1)

conn, addr = sock.accept()
with conn:
    data = conn.recv(1024)
    if not data is None:
        print(data.decode())
        body = "Hello world"
        res = "HTTP/1.1 200 OK\r\n"
        res += "Content-Type: text/html; charset=utf-8\r\n"
        res += "Connection: close\r\n"
        res += "\r\n"
        res += body
        conn.sendall(res.encode())