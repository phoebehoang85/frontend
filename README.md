## Getting started FE repo

### 1. Clone repo by Github command
```
git clone https://github.com/InkWhale-net/frontend
```

### 2. Install node v18.15.0
### 2.1. Install nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.bashrc
``` 
### 2.2. Install node v18.15.0 by using nvm
```
nvm install 18.15.0
```
### 2.3. Use node v18.15.0
```
nvm use 18.15.0
```

### 3. Config `.env` file. Sample is as below: 
```
PORT=3001

REACT_APP_NAME=inkwhale.net
REACT_APP_PROVIDER_URL=wss://ws.test.azero.dev
REACT_APP_API_BASE_URL=https://api-dev.inkwhale.net
REACT_APP_ARTZERO_API_BASE_URL=https://a0-test-api.artzero.io
REACT_APP_IPFS_BASE_URL=https://artzeronft.infura-ipfs.io/ipfs
REACT_APP_PUBLIC_ADDRESS=5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc

NODE_ENV=development
```
Note: If you want to run backend locally, you need to modify the .env of the frontend **REACT_APP_API_BASE_URL=http://localhost:3412**

### 4. Install dependencies 
```
yarn
```

### 5. Start local run
```
yarn start
```

### 6. FE sample
```
https://testnet.inkwhale.net
```

