package karateJava;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.assertTrue;
public class ApiRunnerTest {
//    private static final Logger LOGGER = LoggerFactory.getLogger(ApiRunnerTest.class);

    @Test
    public void testParallel() throws IOException {
        String suite = String.valueOf(System.getProperty("karate.suite"));
        List<String> tags = Arrays.asList("~@ignore");
        List<String> features = Arrays.asList("classpath:features/" + suite);
        String karateOutputPath = "target/surefire-reports";
        Results results = Runner.parallel(tags, features, 3, karateOutputPath);

        // Generate the cucumber reports
        generateReport(karateOutputPath, suite);
        assertTrue(results.getErrorMessages(), results.getFailCount() == 0);
    }

    private static void generateReport(String karateOutputPath, String suite) {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{"json"}, true);
        List<String> jsonPaths = new ArrayList(jsonFiles.size());
        for (File file : jsonFiles) {
            jsonPaths.add(file.getAbsolutePath());
        }
        Configuration config = new Configuration(new File("target"), suite);
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }
}
