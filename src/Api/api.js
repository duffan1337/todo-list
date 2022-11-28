import * as axios from "axios"
import { useDebugValue } from "react"


export const instance =  axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/todos',
})

export const getApi={
    getTasks() {
        return instance.get('?userId=1',
        ).then(response => response.data)
    },
}


  