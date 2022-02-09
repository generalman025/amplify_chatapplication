handler () {
    EVENT_DATA=$1
        DATA=\`ls\`
        RESPONSE="{\"statusCode\": 200, \"body\": \"Hello from Lambda!\"}"
        echo $RESPONSE
}