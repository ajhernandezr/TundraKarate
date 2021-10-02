function karateConfig() {
    karate.configure("connectTimeout", 75000);
    karate.configure("readTimeout", 160000);
    karate.configure("retry", {count: 3, interval: 1000});
    karate.configure('abortedStepsShouldPass', true);

    var env = karate.env;
    var config = {};
    var allSuites = {
        jsonplaceholder: "VA-jsonplaceholder"
    }
    //If running tests locally, replace the the part after ":" with one of the keys from allSuites
    var suite = (karate.properties["karate.suite"] ? karate.properties["karate.suite"] : allSuites.jsonplaceholder);

    // Common variables needed for all test
    config.headersFile = karate.read('classpath:testData/Headers.json');
    config.baseUrl = 'https://www.google.es/';

    config.allUrl = karate.read('classpath:testData/URL.json');


    config.utility = karate.read('classpath:Utility.js');
    config.randomNumber =  Math.floor((Math.random() * 10) +1)

    return config;
}