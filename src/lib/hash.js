import argon2 from "argon2"

export async function GenerateHash(plaintext){
    const hash = await argon2.hash(plaintext)
    return hash
}

export async function VerifyHash(hash, plaintext){
    const isVerify = await argon2.verify(hash, plaintext)
    return isVerify
}