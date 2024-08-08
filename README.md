# Slack Emoji Exporter

- Go to "Customize Your Workspace"
- Open dev tools > Network tab
- Search for `adminList`
- Copy Value > Copy as cURL
- paste into a text buffer, then change `adminList` to `list`
- run the curl command, but output it to a file `... > emojis.json`
- move the `emojis.json` file into the root of this project

Then run:

```
pnpm download emojis.json
```

This will download all of the emoji in that list into the `./output` directory. It operates one file at a time to be kind to Slack's servers.
