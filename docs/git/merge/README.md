## Merge

Merge a case by the case number and add a commit message.  If run without a casenumber or commit message, you will be prompted for one.

### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
  -m, --message     Commit Message                                      [string]
  -r, --remove      Removes local and remote branches after merge      [boolean]
```

### Example

```sh
fred git merge -c 1234 -m "My First Commit Message"
```