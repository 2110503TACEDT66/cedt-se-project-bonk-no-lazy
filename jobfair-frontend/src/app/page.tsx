import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions)

    var profile;

    if (session) {
        profile = await getUserProfile(session.user.token)
    }

  return (
    <main>
      {
        session?
        <Banner user={profile}/> :
        <Banner/>
      }
    </main>
  );
}
