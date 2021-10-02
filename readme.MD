# Rest Automation with Karate
Karate is a popular testing framework, specially for API testing,
Some features:

*Tests are super-readable - as scenario data can be expressed in-line, in human-friendly JSON, XML, Cucumber Scenario Outline tables, or a payload builder approach unique to Karate

*Express expected results as readable, well-formed JSON or XML, and assert in a single step that the entire response payload (no matter how complex or deeply nested) - is as expected

*Comprehensive assertion capabilities - and failures clearly report which data element (and path) is not as expected, for easy troubleshooting of even large payloads

*Standard Java / Maven project structure, and seamless integration into CI / CD pipelines - and support for JUnit 5

*Multi-threaded parallel execution, which is a huge time-saver, especially for integration and end-to-end tests

*Gatling integration can hook into any custom Java code - which means that you can perf-test even non-HTTP protocols such as gRPC


Check more on  [Karate Web](https://github.com/intuit/karate)
## Installation / Running the test

Assuming you have Maven installed in your computer:
```bash
mvn clean install
```

## Example

```cucumber
#Naming the feature, usually I use one feature for each endpoint
Feature: Get the User Posts

#    Defining common parameters for all tests, path, headers, etc...
Background:
    * path '/posts'
    * headers headersFile.DEV

# With the following @tag, its possible to call this scenario from others
  @randomUserId
  
#Name of the Scenario 
  Scenario: Get a random User and verify email format is correct
# Called one Js Function from Utilities.js
     * def userId = randomNumber(10)
#Using the Url from a file where all the testing urls are stored     
    Given url allUrl.dev
#Using the previous random Number as request param    
    And param id = userId
#As configured in the karate config, , the request will be retried 3 times if a 200 is not get
    And retry until responseStatus == 200
# Http method    
    When method GET
# Using the response path, assert that the key must be present    
    Then match response..address == "#array"
    * def address = response
    * print "Here is the address "+address+" for user "+"ran"
# Using the response path, assert the email value should match the following regex    
    And match response[0].email == '#regex^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'

```
## Cucumber Reports
Under target, cucumber htm repors, its possible to check the cucumber reports

## ApiRunner class
This class, called with the @Test annotation, will run the test cases, and accept parameters like the tests cases needed
to run, parallel running, and will also create the Surefire reports that Karate create
```java
public void testParallel() throws IOException { ...
private static void generateReport(String karateOutputPath, String suite) { ...
```
## Karate config
This config file, called before the test cases run, contains all the config for karate, plus all the common files 
readed for use in all the test
```javascript
function karateConfig() {
    karate.configure("retry", {count: 3, interval: 1000});
    ...
    config.utility = karate.read('classpath:Utility.js');
}

```

## Performance Testing

Karate permit the Re-use Karate tests as performance tests executed by Gatling

Use Gatling (and Scala) only for defining the load-model, everything else can be in Karate

Check more on  [Karate Gatling](https://github.com/intuit/karate/tree/master/karate-gatling)

## Installation / Running the test
Provide the path for the scala file in the pom.xml:
```bash
        <testResources>
            <testResource>
                <directory>src/test/resources</directory>
            </testResource>
            <testResource>
                <directory>src/test/performance</directory>
                <excludes>
                    <exclude>**/*.java</exclude>
                    <exclude>**/*.scala</exclude>
                </excludes>
            </testResource>
        </testResources>
```
Run the test with
```bash
mvn gatling:test
```

## Example

```karate
package features

import com.intuit.karate.gatling.PreDef._
import io.gatling.core.Predef._
import scala.concurrent.duration._

class LoadSimulation extends Simulation {

# Create the protocol

val protocol = karateProtocol(
"" -> pauseFor("get" -> 0, "post" -> 0),
)

protocol.nameResolver = (req, ctx) => req.getHeader("karate-name")

# Select a Karate scenario for Gatling

val GetRandomUserId = scenario("GetRandomUserId").exec(karateFeature("classpath:features/IPV/DisplayUserInformation.feature.feature@randomUserId"))

 setUp(
    GetRandomUserId.inject(nothingFor(35.seconds),atOnceUsers(10),rampUsers(10).during(5.seconds),constantUsersPerSec(10).during(5.seconds)).protocols(protocol)
    ).assertions(global.responseTime.max.lt(200000),global.failedRequests.percent.lte(25))
}
```

## Performance Reports

Under target, gatling, its possible to check the gatling reports

