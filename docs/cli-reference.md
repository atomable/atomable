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
_aliases: c_

Cleans the '.atomable' cache.
#### Usage
```
atomable cache <options...>
```
#### options
- --clean (Boolean) (Default: false)
    - aliases: -c

*******************************************************************************

## deploy
_aliases: d_

Deploys all the microservices that are in the current directory or child directory and created the https endpoint if configured.
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
_aliases: e_

Lists the endpoints for the current project or directory name.
#### Usage
```
atomable endpoints <options...>
```
#### options
-  --stage (String) (Default: dev)
    -aliases: -s <value>
-  --region (String) (Default: us-east-1)
    -aliases: -r <value>

*******************************************************************************

## generate
_aliases: g_

Generates a new microservice example with a configured https endpoint with the provided name.
#### Usage
```
atomable generate <name> <options...>
```
#### options
-  --directory (String)
    - aliases: -dir <value>

*******************************************************************************

## help
_aliases: h, --help, -h_

Outputs the usage instructions for all commands or the provided command
#### Usage
```
atomable help <command-name (Default: all)> <options...>
```
#### options
- --verbose (Boolean) (Default: false)
    - aliases: -v

********************************************************************************

## list
_aliases: l_

Lists the CloudFormation stack that are not DELETE_COMPLETE.
#### Usage
```
atomable list <options...>
```
#### options
- --region (String) (Default: us-east-1)
    - aliases: -r <value>

*******************************************************************************

## remove
_aliases: r_

Removes the specified stack.
#### Usage
```
atomable remove <stackName> <options...>
```
#### options
-  --region (String) (Default: us-east-1)
    - aliases: -r <value>

*******************************************************************************

## version
_aliases: v, --version, -v_

outputs atomable version
#### Usage
```
atomable version <options...>
```
#### options
- --verbose (Boolean) (Default: false)

********************************************************************************