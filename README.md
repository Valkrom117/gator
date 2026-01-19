 ### gator RSS blog agreggator

Tool developed for Linux(Ubuntu 22.04) and requires Typescript/Node.js to be installed
You should run the following commands to install its dependencies:
* npm i -D typescript
* sudo apt install postgresql postgresql-contrib
* npm i drizzle-orm postgres
* npm i -D drizzle-kit

tsconfig.json
{  "compilerOptions": {
    "baseUrl": ".",
    "target": "esnext",
    "module": "esnext",
    "rootDir": "./",
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["./src/**/*.ts", "drizzle.config.ts", "lib/db/schema.ts"],
  "exclude": ["node_modules"]
}

Some commands to start:
npm run start register kahya
npm run start login kahya
npm run start addfeed "Hacker News RSS" "https://hnrss.org/newest"
npm run start follow "https://hnrss.org/newest"
npm run start following