## Checkout

The checkout command condenses a few common GIT commands into a single command.  

This checkout command handles the following for you:

1. `git switch master`
2. `git pull`
3. `git checkout -b users/{username}/fb-{casenumber}`
4. `git push -u origin users/{username}/fb-{casenumber}`

If you do not provide the -c option followed by a case number, you will be prompted for one.

![checkout](./checkout-prompt.png)

### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
```

### Example

```sh
fred git checkout -c 1234
```