# Data returns acceptance tests

The Data Returns service will be a new [digital service](https://www.gov.uk/service-manual/digital-by-default) for submitting environmental monitoring data to the [Environment Agency](https://www.gov.uk/government/organisations/environment-agency).  It is being developed in a phased approach, and the first type of data you will be able to submit is the landfill emissions monitoring data that is required by many environmental permits.

The first Phase is designed to allow Permit Holders to upload a CSV file that they have created, following guidance we will provide on GOV.UK.  With a little set-up effort, automated monitoring systems can be programmed to export the data in the desired format. Once this has been set-up it will deliver time savings for Permit Holders for every future data submission. It also saves time for the Environment Agency in processing the data.

The service will provide a format checker and helpful messages to help users ensure the data is in the correct format.

Later releases of the service will be designed for submission of data by individuals filling in the information on-line. This will be more suitable for users who do not have automated monitoring systems, and those who submit relatively small amounts of data.

## About this project

This project contains the acceptance tests for the Data Returns service. We use [Cucumber](https://cucumber.io/) as the means to both document and test the service, and this project contains the current features, step definitions and example CSV files.

It assumes use of [Chimp](https://github.com/xolvio/chimp) in order to run the tests.

## Pre-requisites

The project has no direct dependencies but requires **Chimp** to be installed first. **Chimp** itself relies on [Oracle JDK v1.8+](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node](https://nodejs.org/en/) to be installed. Check out the [installation guide](https://chimp.readme.io/docs/installation) for further details.

## Installation

Assuming **Chimp** is installed you then need to just clone the project from GitHub

```bash
git clone https://github.com/EnvironmentAgency/quke.git
```

## Execution

Open a terminal and ensure you are at the root of the project. Then simply run

```bash
chimp
```

### Run a specific feature

If you just want to run one feature use

```bash
chimp features/error_messages_DR_reference.feature
```

If you its just a single scenario you want to see then its

```bash
chimp features/error_messages_DR_reference.feature:14
```

The `:14` relating the the line number that the **scenario** starts from in the `.feature` file.


## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
