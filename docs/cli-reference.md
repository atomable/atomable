# CLI Reference
The atomable Command Line Interface is a unified tool to manage your microservices.

********************************************************************************

## Available Commands
[cache](#cache)

[deploy](#deploy)

[endpoints](#endpoints)

[generate](#generate)

[help](#help)

[list](#list)

[remove](#remove)

[version](#version)

********************************************************************************

## cache
Cleans the '.atomable' cache.

_aliases: c_

#### Usage
```
atomable cache <options...>
```
#### options
- --clean (Boolean) (Default: false)
    - aliases: -c

*******************************************************************************

## deploy
Deploys all the microservices that are in the current directory or child directory and created the https endpoint if configured.

_aliases: d_
#### Usage
```
atomable deploy <options...>
```
#### options
-  --stage (String) (Default: dev)
    - aliases: -s <value>
-  --region (String) (Default: us-east-1)
    - aliases: -r <value>
-  --minify (Boolean) (Default: true)
    -  aliases: -m
-  --dry (Boolean) (Default: false)
    -  aliases: -d

*******************************************************************************

## endpoints
Lists the endpoints for the current project or directory name.

_aliases: e_
#### Usage
```
atomable endpoints <options...>
```
#### options
-  --stage (String) (Default: dev)
    - aliases: -s <value>
-  --region (String) (Default: us-east-1)
    - aliases: -r <value>

*******************************************************************************

## generate
Generates a new microservice example with a configured https endpoint with the provided name.

_aliases: g_
#### Usage
```
atomable generate <name> <options...>
```
#### options
-  --directory (String)
    - aliases: -dir <value>

*******************************************************************************

## help
Outputs the usage instructions for all commands or the provided command.

_aliases: h, --help, -h_
#### Usage
```
atomable help <command-name (Default: all)> <options...>
```
#### options
- --verbose (Boolean) (Default: false)
    - aliases: -v

********************************************************************************

## list
Lists the CloudFormation stack that are not DELETE_COMPLETE.

_aliases: l, ls_
#### Usage
```
atomable list <options...>
```
#### options
- --region (String) (Default: us-east-1)
    - aliases: -r <value>

*******************************************************************************

## remove
Removes the specified stack.

_aliases: r, rm_
#### Usage
```
atomable remove <stackName> <options...>
```
#### options
-  --region (String) (Default: us-east-1)
    - aliases: -r <value>

*******************************************************************************

## version
Outputs atomable version.

_aliases: v, --version, -v_
#### Usage
```
atomable version <options...>
```
#### options
- --verbose (Boolean) (Default: false)

********************************************************************************
