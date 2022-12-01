## Merge

Merge a feature branch into master.  This command takes care of **10** commands in one! Merge can be preformed from any branch within the repo.   

### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
  -m, --message     Commit Message                                      [string]
  -k, --keep        Keeps local and remote branches after merge        [boolean]
```

### Example

```sh
fred git merge -c 1234 -m "My First Commit Message"
```

### Additional info

Merge runs the following:

1. `git switch master`
2. `git pull`
3. `git switch ${branchName}`
4. `git merge master -m "BugzId: ${casenumber} - merging master to branch"`
5. `git switch master`
6. `git merge --squash ${branchName}`
7. `git commit -m "BugzId: ${casenumber} - ${commitMessage}"`
8. `git push`
9.  `git branch -D ${branchName}`,
10. `git push -d origin ${branchName}`

Optionally, if you'd like to merge your case but KEEP your branches at the end, you can skip the branches from being deleted in steps 9 & 10 by adding `-k` into the end of the merge command.

```sh
fred git merge -k
```

If you do not provide the -c option followed by a case number, you will be provided a list of branches to select from.

![merge](./merge-select.png)

If you do not provide the -m option followed by a message, you will be prompted for one.

A nice feature is that merge will prompt you for a commit message. The prompt will be autofilled with the last commit message used on the merged branch. You can hit enter to use it or type a new message.

![merge](./merge-message.png)

[Back](../README.md) to fred git documentation.