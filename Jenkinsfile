pipeline {
  agent none
  parameters {
    string defaultValue: 'frontend-docker', description: 'rama de proyecto frontend', name: 'BRANCH', trim: false
    string defaultValue: 'debian', description: 'nodo esclavo en VM', name: 'LABEL_NODE_DEV', trim: false
    string defaultValue: 'debian', description: 'nodo ambiente QA', name: 'LABEL_NODE_QA', trim: false
    string defaultValue: 'master', description: 'nodo Master principal', name: 'LABEL_NODE_PROD', trim: false
  }
  environment{
    DEV_NODE="${params.LABEL_NODE_DEV}"
    QA_NODE="${params.LABEL_NODE_QA}"
    PROD_NODE="${params.LABEL_NODE_PROD}"
  }
  stages {
    stage('cloning') {
      agent { label DEV_NODE }
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/janny35/Gestion_tareas_multiusuarios.git'
        sh 'echo "clonación finalizada"'
        sh 'pwd'
      }
    }
    stage('building in dev') {
      agent { label DEV_NODE }
      steps {
        sh 'docker build -t proyecto-final-front:1.0.0 .'
        sh "docker save -o proyecto-final-front.tar proyecto-final-front:1.0.0"
        stash name: "stash-artifact", includes: "proyecto-final-front.tar"
        archiveArtifacts 'proyecto-final-front.tar'
      }
    }
    stage("Deployment on PROd environment"){
      agent { label PROD_NODE }
      steps{
          unstash "stash-artifact"
          sh "docker load -i proyecto-final-front.tar"
          sh "docker rm proyecto-final-front -f || true"
          sh "docker run -idt -p 8888:80 --name proyecto-final-front proyecto-final-front:1.0.0"
      }
    }
  }
}