## CHECK OR INSTALL: Node.js

```**Bash/Terminal:**
(command -v node >/dev/null && echo "✔ Node.js installed: $(node -v)") || (
  echo "❌ Node.js missing — installing Node.js LTS via nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  source ~/.nvm/nvm.sh
  nvm install --lts
  echo "✔ Node.js installed: $(node -v)")
```


## CHECK OR INSTALL: npm  (auto-installed with Node.js)

```**Bash/Terminal:**
(command -v npm >/dev/null && echo "✔ npm installed: $(npm -v)") || (
  echo "❌ npm missing — installing Node.js LTS (npm included)..."
  source ~/.nvm/nvm.sh
  nvm install --lts
  echo "✔ npm installed: $(npm -v)")
```



## CHECK OR INSTALL: nodemon

```**Bash/Terminal:**
(command -v nodemon >/dev/null && echo "✔ nodemon installed") || (
  echo "❌ nodemon missing — installing globally..."
  npm install -g nodemon
  echo "✔ nodemon installed")
```



# CHECK OR INSTALL: nvm
```**Bash/Terminal:**
(command -v nvm >/dev/null && echo "✔ nvm installed") || (
  echo "❌ nvm missing — installing nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  echo "✔ nvm installed — reload your terminal or run: source ~/.nvm/nvm.sh")
```



## 1. Install required dependencies for framework

1. cd framework
2. npm install
3. cd ..


## 2. Install required dependencies for template/node-template

1. cd template
2. cd node-template
3. npm install
4. cd ..
5. cd ..


## 3. Run the genrateNode.js file using node
#### Run the following command to generate the required number of nodes/servers using "generateNodes.js"
```**Bash/Terminal:**
node generateNodes.js 8
```


## 4. Run the runNodes.js file using node
#### Run the following command to run all servers using "runNodes.js"
```**Bash/Terminal:**
node runNodes.js
```
