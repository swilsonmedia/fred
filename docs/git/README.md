# FRED CLI - `GIT` 


## Usage

```
Options:
  --help, -h 
```

## Example

```sh
fred git
```

## Available Commands

- [Checkout](#checkout)
- [Cleanup](#cleanup)
- [Merge](#merge)
- [Switch](#switch)

### Checkout

Creates a new branch by the case number.

#### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
```

#### Example

```sh
fred git checkout -c 1234
```

### Cleanup

Deletes local and remote branches by the case number.

#### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
```

#### Example

```sh
fred git cleanup -c 1234
```

### Merge

Merge a case by the case number and add a commit message

#### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
  -m, --message     Commit Message                                      [string]
  -r, --remove      Removes local and remote branches after merge      [boolean]
```

#### Example

```sh
fred git merge -c 1234 -m "My First Commit Message"
```

### Switch
Switch to available local and remote branches.

#### Usage

```
Options:
      --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --verbose     Run with verbose logging                           [boolean]
  -c, --casenumber  Case number                                         [number]
```

#### Example

```sh
fred git switch -c 1234
```
