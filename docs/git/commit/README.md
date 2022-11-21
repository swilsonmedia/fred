## Commit

Commits staged changes a case by the case number and adds a commit message.  If run without a casenumber or commit message, you will be prompted for one.

### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
  -m, --message     Commit Message                                      [string]
```

### Example

```sh
fred git commit -c 1234 -m "My First Commit Message"
```