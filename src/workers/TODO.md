# Add a new Collection to mongo database 'serverQueue'

"serverTaskQueue" : {
type : string
once : boolean
time : [ number [second, minute, hour, day]] if(boolean) time = null
data : object
abort: boolean
attempts : number
status : number { 0 : "Not Started", 1 : "Working on It", 2 : "Complete", 3 : "Error while completing task"}
}

"backendLogs" : {
type : string ["Warning", "Error", "Info"]
from : string
message : string
createdAt : string
}
