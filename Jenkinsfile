pipeline {
    agent any

  tools {
      maven 'Maven'
      jdk 'JAVA11'
    }

    // environment {
    //     CHROME_BIN = '/bin/google-chrome'
    // }

    stages {
        stage('Dependencies') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/ajhernandezr/karateMailPoc.git'
            }
        }
        stage('API Test') {
            steps {
                sh 'mvn clean install -Dkarate.suite=jsonplaceholder'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
         post {
            always {
                 cucumber customCssFiles: '', customJsFiles: '', fileExcludePattern: '**/*.xml', fileIncludePattern: '**/*.json', jsonReportDirectory: 'target/surefire-reports', reportTitle: 'API TEST REPORTS', sortingMethod: 'ALPHABETICAL'
         }
    }
}
