"use client"
import {useSession,signIn,signOut}from "next-auth/react";
export default function Component(){
    const {data:session}=useSession()
    if(session){
        return(
            <>
            Signed in as {session.user.email} <br/>
            <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
        Not Signed in <br/>
        <button className="bg-orange-300 px-3 py-1 rounded" onClick={()=>signIn()}>Sign In</button>
        </>
    )
}