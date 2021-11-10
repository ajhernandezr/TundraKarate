package features

import com.intuit.karate.gatling.PreDef._
import io.gatling.core.Predef._
import scala.concurrent.duration._


class LoadSimulation extends Simulation {

val protocol = karateProtocol(
"" -> pauseFor("get" -> 0, "post" -> 0),
)

protocol.nameResolver = (req, ctx) => req.getHeader("karate-name")

val GetRandomUserId = scenario("GetRandomUserId").exec(karateFeature("classpath:features/jsonplaceholder/DisplayUserInformation.feature@randomUserId"))

 setUp(
    GetRandomUserId.inject(nothingFor(1.seconds),atOnceUsers(5),rampUsers(5).during(5.seconds),constantUsersPerSec(5).during(5.seconds)).protocols(protocol)
    ).assertions(global.responseTime.max.lt(200000),global.failedRequests.percent.lte(25))
}
