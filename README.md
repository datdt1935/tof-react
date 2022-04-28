# Setup Enviroment

- Ensure you install Java SDK in your local machine (>8)

# Infomcation

Backend port: 3200

React port : 5000 | 3000

# Run Dev

Start intance for create swagger.json

```
cd server
npm start
```

then execute below command

```
npm build
```

2. Generator client project

```
npm run api
```

3. Start electron & nodejs

```
npm run dev
```

# Create Electron app distributable for Windows (from a Windows machine):

```
npm run electron:build
```

# Create Electron app distributable for macOS (from a macOS machine):

```
npm run electron:build-mac
```

# Create Electron app distributable for Linux (from a linux machine; we can also create it from a Windows machine and run the below cmd in the Windows Subsystem Linux 2 - WSL2: https://docs.microsoft.com/en-us/windows/wsl/install-win10):

```
npm run electron:build-linux
```
