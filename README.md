# node-aerospike-udf
How to create Aerospike UDF (user define function) using node.js
# LUA
lua is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description.
Aerospkie UDF is written in lua.
# Aerospike
aql
REGISTER MODULE 'test_udf.lua'
SHOW MODULES
AGGREGATE test_udf.test_fn() ON namespace.set
# Versions
Node.js v8-14 - Aerospike client v3.16 - server 3
Node.js v20-22 - Aerospike client v5 - server 7.1
# Usage
1. Register lua module in Aerospike using aql (a file with a script). It is mandatory
2. Create secondary index (for the filter). It is mandatory
3. Execute index.js
