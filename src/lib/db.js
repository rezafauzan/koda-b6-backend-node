import { Pool } from "pg";

const pool = new Pool()

export default function db(){
    return pool
}