Feature: Get the User Posts

  #    Defining common parameters for all tests, path, headers, etc...
  Background:
    * path '/posts'
    * headers headersFile.DEV
    * def userId = randomNumber

  @getUserPosts
  Scenario: Get user associated Posts
    Given url allUrl.dev
    And param id = userId
    And retry until responseStatus == 200
    When method GET
    Then match response[0].id == "#number"
    And match response[0].title == "#string"
    And match response[0].body == "#string"

  Scenario: Create a new Post with Title and body
    #Call the previous scenario for get his ID
    * call read('this:UserPosts.feature@getUserPosts')
#   Get an external file and use it in the requests
    * def bodyRequest = read('this:requests/NewPost.json')
    #Set the Id in the request, overwriting the former one:
    * set bodyRequest.userId = userId

    Given url allUrl.dev
    And request bodyRequest
    And retry until responseStatus == 201
    When method POST
