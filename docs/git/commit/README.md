## Commit

The commit command condenses a few common GIT commands into a single command.  

This commit command handles the following for you:

1. `git commit -m "${commitMessage}"`
2. `git push`

If you do not provide the -m option followed by a message, you will be prompted for a message.

![commit](./commit-prompt.png)

If you have unstaged changes, it will ask you if you would like to include those changes in the commit.  In this case, it runs a `git add .` before the other commands if "y" is entered.  If "n" is entered, only currently staged files get committed.

![commit](./commit-staging.png)


### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -m, --message     Commit Message                                      [string]
```

### Example

```sh
fred git commit -m "My First Commit Message"
```