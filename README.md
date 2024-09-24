# MDtest 

## API project

```
node v20.15.0
npm v10.7.0
```

Pre run actions

`npm run initDb` - init mock data for database   
`npm install` - install dependencies  
`npm run tsbuild` - build TS code (only on first run)  
`npm run dev` - run app with dev environment

**Environment variables**  
Should be prepared in .env file for local run  
Check `.env.example file` for example  

**!!!IMPORTANT**
Your mongo database should be setup with replica set and it should be reflected in MONGO_URL  
For example: `MONGO_URL=mongodb://localhost:27017/MDtest?replicaSet=rs0`
