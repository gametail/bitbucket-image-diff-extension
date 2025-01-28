# Setup

1. Clone this repo
2. Install dependencies ```npm i```
3. Run ```npm run postinstall```
4. Create a ```.env``` file in the root of this project and add a match url environment variable for your bitbucket for example: ```WXT_MATCH_URL=https://bitbucket.org/*```
5. Go in the ```wxt.config.ts``` and check the runner object, if you want to preserve the data of the dev browser uncomment the correct lines, else remove both
6. Start the dev server ```npm run dev``` and visit a PR with img Diffs on your Bitbucket
7. Open the Diff settings
![cog](example/cog.png)
and then select ```All at once``` under Load Files and Save 
![alt text](example/diff_settings.png)
8. Refresh the page

If you set everything up correctly you can visit a pull request with an image diff.

Here is an example PR if you want to test the extension:
https://bitbucket.org/gametail/snapshotdiffexample/pull-requests/1/diff

Here is how it looks without the extension:
![without extension](example/without_extension.png)

Here is how it looks with the extension:
![with extension](example/with_extension.png)