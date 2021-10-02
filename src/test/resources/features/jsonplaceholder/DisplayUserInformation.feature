Feature: Display user information

  #    Defining common parameters for all tests, path, headers, etc...
  Background:
    * path '/users'
    * headers headersFile.DEV

  @randomUserId
  Scenario: Get a random User and verify email format is correct
    * def userId = randomNumber(10)

    Given url allUrl.dev
    And param id = userId
    And retry until responseStatus == 200
    When method GET
    Then match response..address == "#array"
    * def address = response
    * print "Here is the address "+address+" for user "+"ran"
    And match response[0].email == '#regex^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'

#    Bonus for show the Scenario Outline:
  Scenario Outline: Get different Users and verify email format is correct
    Given url allUrl.dev
    And param id = <Id>
    And retry until responseStatus == 200
    When method GET
    Then match response..address == "#array"
    * def address = response
    * print "Here is the address "+address+" for user "+"ran"
    And match response[0].name == '<name>'
    And match response[0].company.name == '<companyName>'

    Examples:
      | Id | name             | companyName        |
      | 1  | Leanne Graham    | Romaguera-Crona    |
      | 2  | Ervin Howell     | Deckow-Crist       |
      | 3  | Clementine Bauch | Romaguera-Jacobson |
      | 4  | Patricia Lebsack | Robel-Corkery      |