import NextAuth from "next-auth/next";
import { authOptions } from "./opitons";

const handler=NextAuth(authOptions);

//sorasori methodname export hoy na route file e
export {handler as GET,handler as POST}