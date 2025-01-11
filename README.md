# Setup

1. Clone this repo
2. Install dependencies ```npm i```
3. Run ```npm run postinstall```
4. Create a ```.env``` file in the root of this project and add a match url environment variable for your bitbucket for example: ```WXT_MATCH_URL=https://bitbucket.org/*```
5. Go in the ```wxt.config.ts``` and check the runner object, if you want to preserve the data of the dev browser uncomment the correct lines, else remove both
6. Start the dev server ```npm run dev``` and visit a PR with img Diffs on your Bitbucket