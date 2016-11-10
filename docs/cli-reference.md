# CLI Reference
The atomable Command Line Interface is a unified tool to manage your microservices.

## Available Commands
[help]
[version]
[cache]
[deploy]
[generate]
[list]
[remove]
[endpoints]

## help, aliases: h, --help, -h
Outputs the usage instructions for all commands or the provided command
#### Usage
```
help <command-name (Default: all)> <options...>
```
#### options
- --verbose (Boolean) (Default: false)
  aliases: -v

## version, aliases: v, --version, -v
outputs ember-cli version
#### Usage
```
help <command-name (Default: all)> <options...>
```
#### options
- --verbose (Boolean) (Default: false)

## cache, aliases: c
Cleans the '.atomable' cache.
#### Usage
```
cache cache <options...>
```
#### options
- --clean (Boolean) (Default: false)
    aliases: -c

atomable deploy <options...>
  aliases: d
  --stage (String) (Default: dev)
    aliases: -s <value>
  --region (String) (Default: us-east-1)
    aliases: -r <value>
  --minify (Boolean) (Default: true)
    aliases: -m
  --dry (Boolean) (Default: false)
    aliases: -d

atomable generate <name> <options...>
  Generates a sample microservice
  aliases: g
  --directory (String)
    aliases: -dir <value>

atomable list <options...>
  Lists the CloudFormation stack that are not DELETE_COMPLETE
  aliases: l
  --region (String) (Default: us-east-1)
    aliases: -r <value>

atomable remove <stackName> <options...>
  Removed the specified stack.
  aliases: r
  --region (String) (Default: us-east-1)
    aliases: -r <value>

atomable endpoints <options...>
  aliases: e
  --stage (String) (Default: dev)
    aliases: -s <value>
  --region (String) (Default: us-east-1)
    aliases: -r <value>
