# REST API FOR RACING RESULT

This is a REST API for handling the results of an F1 race.

# INSTALL

1. Install node.js at [link](https://nodejs.org/en/download)
2. Install **mysql**

# USER MANUAL

1. Clone this repository by running the following command:

```sh
$ git pull https://github.com/nqqduy/test-racing.git
```

2. Navigate to the crawling folder:

```sh
$ cd test-racing/crawling
```

3. Verify the database configuration in the .env file.

4. Run the following command to install library:

```sh
$ npm i
```

5. Run the following command to execute the program:

```sh
$ npm run start
```

# Directory Structure

Below is the directory structure of the project:

- `src/`: Directory that contains the source code of the program.
  - `server.ts`: Main file of the program.
  - `config/`: Directory that contains configuration files.
  - `constants/`: Directory that contains constant files
  - `modules/`: Directory that contains feature folder.
  - `schema/`: Directory that contains schema files
  - `common/`: Directory that contains files for using common
- `.env`: File that stores environment variables.
- `package.json`: File that holds the project's metadata and dependencies.
- `package-lock`: File that locks the versions of the project's dependencies.
- `tsconfig.json`: Configuration file for TypeScript compiler.

# API DOCUMENT

Below is the api document of the project:

## # **Get Race Result By Year**

## **API Get Race Result By Year**

### **GET**

**Test**: [http://localhost:3000/api/v1/races/:year/result](http://localhost:3000/api/v1/races/:year/result)

## **REQUEST**

### **Param**

| Field | Type   | Description                    | required |
| :---: | ------ | ------------------------------ | -------- |
| year  | string | year that user want to searrch | yes      |

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
    {
      "grandPrix": "Bahrain",
      "date": "05 Mar 2023",
      "winner": "Max Verstappen",
      "car": "Red Bull Racing Honda RBPT",
      "laps": "57",
      "time": "1:33:56.736"
    },
    {
      "grandPrix": "Saudi Arabia",
      "date": "19 Mar 2023",
      "winner": "Sergio Perez",
      "car": "Red Bull Racing Honda RBPT",
      "laps": "50",
      "time": "1:21:14.894"
    },
    {
      "grandPrix": "Australia",
      "date": "02 Apr 2023",
      "winner": "Max Verstappen",
      "car": "Red Bull Racing Honda RBPT",
      "laps": "58",
      "time": "2:32:38.371"
    },
    {
      "grandPrix": "Azerbaijan",
      "date": "30 Apr 2023",
      "winner": "Sergio Perez",
      "car": "Red Bull Racing Honda RBPT",
      "laps": "51",
      "time": "1:32:42.436"
    },
    ...
    ...

  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```

## # **Get Detail Race Result By Year and Location**

## **Get Detail Race Result By Year and Location**

### **GET**

**Test**: [http://localhost:3000/api/v1/races/result?year=&location=](http://localhost:3000/api/v1/races/result?year=&location=)

## **REQUEST**

### **Param**

|  Field   | Type   | Description                    | required |
| :------: | ------ | ------------------------------ | -------- |
|   year   | string | year that user want to searrch | no       |
| location | string | year that user want to searrch | no       |

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
  [
  {
    "pos": "1",
    "no": "1",
    "driver": "Max Verstappen",
    "car": "Red Bull Racing Honda RBPT",
    "laps": "57",
    "time": "1:33:56.736",
    "pts": 25
  },
  {
    "pos": "2",
    "no": "11",
    "driver": "Sergio Perez",
    "car": "Red Bull Racing Honda RBPT",
    "laps": "57",
    "time": "+11.987s",
    "pts": 18
  },
  {
    "pos": "3",
    "no": "14",
    "driver": "Fernando Alonso",
    "car": "Aston Martin Aramco Mercedes",
    "laps": "57",
    "time": "+38.637s",
    "pts": 15
  },
    ...
    ...
  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```

## # **Get Driver Ranking By Year**

## **Get Driver Ranking By Year**

### **GET**

**Test**: [http://localhost:3000/api/v1/drivers/ranking?year=](http://localhost:3000/api/v1/drivers/ranking?year=)

## **REQUEST**

### **Param**

| Field | Type   | Description                    | required |
| :---: | ------ | ------------------------------ | -------- |
| year  | string | year that user want to searrch | no       |

**Note**: If the user does not pass the year value, then ranking the driver for the whole year

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
  {
    "pos": 1,
    "driver": "Max Verstappen",
    "pts": 164,
    "nationality": "NED",
    "car": "Red Bull Racing Honda RBPT"
  },
  {
    "pos": 2,
    "driver": "Sergio Perez",
    "pts": 109,
    "nationality": "MEX",
    "car": "Red Bull Racing Honda RBPT"
  },
  {
    "pos": 3,
    "driver": "Fernando Alonso",
    "pts": 96,
    "nationality": "ESP",
    "car": "Aston Martin Aramco Mercedes"
  },
    ...
    ...
  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```

## # **Get Detail Driver Result By Year And driver**

## **Get Detail Driver Result By Year and Location**

### **GET**

**Test**: [http://localhost:3000/api/v1/drivers/result?year=&driver=](http://localhost:3000/api/v1/drivers/result?year=&driver=)

## **REQUEST**

### **Param**

| Field  | Type   | Description                           | required |
| :----: | ------ | ------------------------------------- | -------- |
|  year  | string | year that user want to searrch        | no       |
| driver | string | driver name that user want to searrch | no       |

**Note**: If the user does not pass the year value and driver value, then ranking the driver for the whole year and driver

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
  {
    "grandPrix": "Bahrain",
    "date": "05 Mar 2023",
    "car": "Williams Mercedes",
    "racePosition": "10",
    "pts": 1
  },
  {
    "grandPrix": "Saudi Arabia",
    "date": "19 Mar 2023",
    "car": "Williams Mercedes",
    "racePosition": "NC",
    "pts": 0
  },
  {
    "grandPrix": "Australia",
    "date": "02 Apr 2023",
    "car": "Williams Mercedes",
    "racePosition": "NC",
    "pts": 0
  },
    ...
    ...
  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```

## # **Get Team Ranking By Year**

## **Get Team Ranking By Year**

### **GET**

**Test**: [http://localhost:3000/api/v1/teams/ranking?year=](http://localhost:3000/api/v1/teams/ranking?year=)

## **REQUEST**

### **Param**

| Field | Type   | Description                    | required |
| :---: | ------ | ------------------------------ | -------- |
| year  | string | year that user want to searrch | no       |

**Note**: If the user does not pass the year value, then ranking the driver for the whole year

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
   {
    "pos": 1,
    "team": "Red Bull Racing Honda RBPT",
    "pts": 273
  },
  {
    "pos": 2,
    "team": "Mercedes",
    "pts": 145
  },
  {
    "pos": 3,
    "team": "Aston Martin Aramco Mercedes",
    "pts": 130
  },
    ...
    ...
  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```

## # **Get Detail Team Result By Year And driver**

## **Get Detail Team Result By Year and Location**

### **GET**

**Test**: [http://localhost:3000/api/v1/teams/result?year=&team=](http://localhost:3000/api/v1/teams/result?year=&team=)

## **REQUEST**

### **Param**

| Field | Type   | Description                         | required |
| :---: | ------ | ----------------------------------- | -------- |
| year  | string | year that user want to searrch      | no       |
| team  | string | team name that user want to searrch | no       |

**Note**: If the user does not pass the year value and team value, then ranking the driver for the whole year and team

## **RESPONSE**

### **SUCCESS 200**

```json
{
  "result": true,
  "message": "successfully!",
  "data": [
 {
    "grandPrix": "Bahrain",
    "date": "05 Mar 2023",
    "pts": 4
  },
  {
    "grandPrix": "Saudi Arabia",
    "date": "19 Mar 2023",
    "pts": 0
  },
  {
    "grandPrix": "Australia",
    "date": "02 Apr 2023",
    "pts": 2
  },
    ...
    ...
  ]
}
```

### **ERROR 500 (Internal Server Error)**

```json
{
  "result": false,
  "message": "some thing...",
  "data": null,
  "errorCode": "INTERNAL_SV_ERR"
}
```
