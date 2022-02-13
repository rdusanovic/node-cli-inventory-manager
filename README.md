# IBM Garage Coding Challenge

## Intro

This code contains a node js command line application.

The goal of this application is to provide a command line interface for an inventory management and order processing system.

The application allows users to load an inventory from a .csv file with the 'load' command, read back the ingested inventory through the 'inventory' command, and process orders through the 'order' command.

Shell commands (load, inventory, order) send http requests to the server (controller), which asks a service (loadService, inventoryService, orderService) to process the request before returning the response to the terminal.

## Installation
While in the root folder

To install node js dependencies
```bash
> npm install .
```

To install terminal commands
```bash
> npm install -g .
```

## Usage

Start the node server

```bash 
> node .
```

Open a separate terminal to run CLI commands

**Load**

Loads an inventory from a .csv file.
Expects csv to have three columns; code (string), count (int), price (int)

Usage: load -f path-to-file
  
Example:
  
```bash
> load -f './example-file-small.csv'
Loaded items successfully  
```  
  
If the file does not exist  
```bash
> load -f './example-fake-file.csv'
Unable to read file  
```  
  
If the inventory has already been populated
```bash
> load -f './example-file-small.csv'
Loaded items successfully
> load -f './example-file-small.csv'
Inventory already populated
```  
  
If the file contains invalid entries - negative count or negative price
  ```bash
  > load -f './example-file-invalid.csv'
  Invalid product specification
  ```

**Inventory**
  
Prints the contents of the inventory to console
  
Usage: inventory

eg.  
```bash
> inventory
VS, options: 3x6.99, 5x8.99
BM, options: 4x10.99, 6x12.99  
```
or if no inventory has been loaded  
  
```bash
> inventory
The bakery is empty  
```  

**Order**
  
Calculates the order with the least packages required
  
  Requires order to be entered as a JSON string with inner quotes escaped
  
  Usage: order -o "{\\"VS\\": 10, ...}"
  
  Eg.
  ```bash
  > inventory
  VS, options: 3x6.99, 5x8.99
  BM, options: 2x9.95, 5x16.95, 8x24.95
  > order -o "{\"VS\": 10, \"BM\": 14}"
  VS, $17.98, packages: 2x5
  BM, $54.8, packages: 1x8, 3x2
  ```
  
  Unsatisfiable orders, and orders with incorrect product codes will not be filled
  
  ```bash
  > inventory
  VS, options: 3x6.99, 5x8.99
  BM, options: 2x9.95, 5x16.95, 8x24.95
  > order -o "{\"VS\": 4}"
  Order unsatisfiable
  > order -o "{\"VM\": 10}"
  Some order codes are not in the inventory
  ```
  
## Tests

In the root directory run

```bash
npm test
```

## Dependencies

- axios
- express
- jest
- yargs
- body-parser
- csv-parse

## Cleanup

  Run the following commands in the root directory 

To clear node js dependencies
```bash
npm uninstall -g .
```

To clear command line scripts
```bash
npm uninstall -g ibm-interview-project
```

