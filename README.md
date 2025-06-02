# Redes

Este repositório contém um projeto que utiliza Docker para rodar três instâncias de um servidor web, acessadas por meio de um proxy reverso e balanceador de carga.

## 🛠 Tecnologias Utilizadas

- **Docker**
- **Nginx**
- **OpenVPN**
- **EasyRSA**
- **NestJS**
- **Vite**

## 🐳 Imagens Docker

- [Backend](https://hub.docker.com/r/ryanwakugawa/redes-server)
- [Frontend](https://hub.docker.com/r/ryanwakugawa/redes-app)

## Topologia

![Topologia](https://github.com/ryan-wakugawa/redes/blob/main/Redes.drawio.svg)

## Nginx

```nginx
events {
        worker_connections 768;
        # multi_accept on;
}

http {
        upstream servers {
                server IP_PRIVADO_BACKEND:3001;
                server IP_PRIVADO_BACKEND:3002;
                server IP_PRIVADO_BACKEND:3003;
        }
        server {
                listen 80;

                allow 10.8.0.0/24;
                deny all;

                location / {
                        root /home/ubuntu/redes/app/dist;
                        index index.html;
                }

                location /api/ {
                        proxy_pass http://servers/;
                        proxy_http_version 1.1;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
                }
        }
}

```

## VPN

### Configuração Servidor

```openvpn
port 1194
proto udp
dev tun
ca /etc/openvpn/ca.crt
cert /etc/openvpn/servidor-web.crt
key /etc/openvpn/servidor-web.key
dh /etc/openvpn/dh.pem
tls-auth /etc/openvpn/ta.key 0
crl-verify /etc/openvpn/crl.pem
server 10.8.0.0 255.255.255.0
keepalive 10 120
persist-key
persist-tun
comp-lzo
user nobody
group nogroup
status /var/log/openvpn-status.log
log-append /var/log/openvpn.log
verb 3
explicit-exit-notify 1
```

### Configuração Cliente

```openvpn
client
dev tun
proto udp
remote IP_PUBLICO_VM
port 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
tls-auth ta.key 1
cipher AES-256-CBC
comp-lzo
verb 3

<ca>
-----BEGIN CERTIFICATE-----
...conteúdo do ca.crt...
-----END CERTIFICATE-----
</ca>
<cert>
-----BEGIN CERTIFICATE-----
...conteúdo do cliente1.crt...
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN PRIVATE KEY-----
...conteúdo do cliente1.key...  
-----END PRIVATE KEY-----
</key>
<tls-auth>
-----BEGIN OpenVPN Static key V1-----
...conteúdo do ta.key...
-----END OpenVPN Static key V1-----
</tls-auth>
```
