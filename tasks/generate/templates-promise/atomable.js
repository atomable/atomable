module.exports =
  `---
name: beretta

handler: beretta.beretta

https:
  path: beretta
  method: get
  parameters:
  - in: query
    name: firstName`;
