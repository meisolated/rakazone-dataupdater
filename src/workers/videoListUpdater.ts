import { Videos } from "models"

Videos.find().then((data: any) => {
    console.log(data)
})