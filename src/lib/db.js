import { Client } from "pg";

const client = new Pool()

export default function db(){
    return client
}